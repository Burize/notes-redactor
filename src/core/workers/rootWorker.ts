import { convertNoteResponse, convertSynchronizeNotesResponse } from 'services/api/converters';
import { storage } from 'services/storage';
import { IServerNote, ISyncNoteResponse } from 'services/api/types/Note';
import { NoteFieldsForCreation, INote } from 'shared/types/models';
import getEnvParams from 'shared/helpers/getEnvParams';
import { ChangeNoteId } from 'shared/types/message';

const _self: ServiceWorkerGlobalScope = self as any;

type NoteAction = 'getAll' | 'get' | 'create' | 'update' | 'delete';

const handlerByAction: Record<NoteAction, (request: Request) => Promise<Response>> = {
  getAll: getAllNotes,
  get: getNote,
  create: createNote,
  update: updateNote,
  delete: deleteNote,
};

const CACHE_NAME = 'cache-v1';

const urlsRegExp = {
  redactorRegExp: /\/redactor\/([^\/]+)$/,
  notesRegExp: /\/notes$/,
  noteRegExp: /\/note\/[^\/]*$/,
};

const urlsToCache = serviceWorkerOption.assets;

_self.addEventListener('install', (event) => {
  event.waitUntil(storage.initialize()); // TODO: handle case when DB has deleted

  caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll(urlsToCache);
    });
});

_self.addEventListener('fetch', (event) => {
  const requestUrl = event.request.url;
  if (urlsToCache.some(cacheUrl => requestUrl.includes(cacheUrl))) {
    returnCache(event);
    return;
  }

  if (requestUrl.includes('/note')) {
    event.respondWith(handleNoteRequest(event));
    return;
  }

  event.respondWith(fetch(event.request));
});

function returnCache(event: FetchEvent) {
  event.respondWith(caches.match(event.request)
    .then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        (response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        },
      );
    }));
}

_self.addEventListener('sync', (event) => {
  event.waitUntil(refreshNotes());
});

async function refreshNotes() {
  const { apiUrl } = getEnvParams();
  if (!apiUrl) {
    throw Error('api url is not specified');
  }

  const stashedNotes = await storage.getAllNotes();

  const response = await fetch(apiUrl + 'notes/refresh', {
    method: 'PUT',
    body: JSON.stringify(stashedNotes),
    headers: { 'Content-Type': 'application/json' },
  });
  const refreshedNotes: ISyncNoteResponse[] = await response.json();

  const { notes, idsMap } = convertSynchronizeNotesResponse(refreshedNotes);

  await storage.synchronizeStorage(notes);
  await updateTemporaryId(idsMap);
}

async function updateTemporaryId(idsMap: Record<string, string>) {
  const clients = await _self.clients.matchAll({ type: 'window' });
  clients.forEach(client => {
    const urlMatch = client.url.match(urlsRegExp.redactorRegExp);
    if (!urlMatch) { return; }

    const [, noteId] = urlMatch;
    if (idsMap[noteId] !== noteId) {
      const message: ChangeNoteId = { type: 'changeNoteId', payload: { noteId } };
      client.postMessage(message);
    }
  });
}

async function handleNoteRequest(event: FetchEvent) {
  const request = event.request;
  const noteAction = chooseNoteActionByRequest(request);

  if (!noteAction) {
    return fetch(request);
  }

  const notSynchronized = await storage.hasUnsavedData();

  if (notSynchronized) {
    return handleRequestOffline(request, noteAction);
  }

  const clonedRequest = request.clone();
  try {
    const response = await handlerByAction[noteAction](request);
    return response;
  } catch (_error) {
    return handleRequestOffline(clonedRequest, noteAction);
  }
}

function chooseNoteActionByRequest(request: Request): NoteAction | void {
  const { method, url } = request;
  if (method === 'GET' && urlsRegExp.notesRegExp.test(url)) { return 'getAll'; }
  if (method === 'GET' && urlsRegExp.noteRegExp.test(url)) { return 'get'; }
  if (method === 'POST') { return 'create'; }
  if (method === 'PATCH') { return 'update'; }
  if (method === 'DELETE') { return 'delete'; }
}

async function getAllNotes(request: Request) {
  const response = await fetch(request);
  const clonedResponse = response.clone();
  // CHECK FOR VALID
  const serverNotes: IServerNote[] = await clonedResponse.json();
  const notes = serverNotes.map(convertNoteResponse);
  await storage.refreshStore(notes);
  return response;
}

async function getNote(request: Request) {
  const response = await fetch(request);
  return response;
}

async function createNote(request: Request) {
  const response = await fetch(request);
  const clonedResponse = response.clone();
  const noteResponse: IServerNote = await clonedResponse.json();
  await storage.createNote(convertNoteResponse(noteResponse));
  return response;
}

async function updateNote(request: Request) {
  const clonedRequest = request.clone();
  const response = await fetch(request);
  const note: INote = await clonedRequest.json();
  await storage.updateNote(note);
  return response;
}

async function deleteNote(request: Request) {
  const clonedRequest = request.clone();
  const response = await fetch(request);
  const { id } = await clonedRequest.json();
  await storage.deleteNote(id);
  return response;
}

async function handleRequestOffline(request: Request, type: NoteAction) {
  await storage.createTemporaryStorage();
  _self.registration.sync.register('refresh');

  if (type === 'getAll') {
    const notes = await storage.getAllNotes();
    return new Response(JSON.stringify(notes), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (type === 'get') {
    const [, noteId] = request.url.match(/\/note\/([^\/]+)$/) || ([] as string[]);
    const note = await storage.getNote(noteId);

    if (!note) { throw Error('not was not find by specified id'); }

    return new Response(JSON.stringify(note), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (type === 'create') {
    const noteFields: NoteFieldsForCreation = await request.json();
    const note = await storage.createNote(noteFields);
    return new Response(JSON.stringify(note), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (type === 'update') {
    const note: INote = await request.json();
    await storage.updateNote(note);
    return new Response(null);
  }

  if (type === 'delete') {
    const { id } = await request.json();
    await storage.deleteNote(id);
    return new Response(null);
  }

  throw new Error('Unknown note request type');
}
