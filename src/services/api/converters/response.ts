import { INote } from 'shared/types/models';

import { IServerNote, IServerSyncNote, ISyncNotes } from '../types/Note';

export function convertNoteResponse(note: IServerNote): INote {
  return { id: note.id, title: note.title, body: note.body };
}

export function convertSynchronizeNotesResponse(refreshedNotes: IServerSyncNote[]): ISyncNotes {
  return refreshedNotes.reduce((acc, cur) => ({
    notes: [...acc.notes, cur.note],
    idsMap: { ...acc.idsMap, [cur.TemporaryId]: cur.note.id },
  }),
    { notes: [], idsMap: {} });
}
