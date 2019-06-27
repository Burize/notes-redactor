import { initNoteWorker, handleNoteRequest } from './noteWorker';
import getEnvParams from 'shared/helpers/getEnvParams';

const _self: ServiceWorkerGlobalScope = self as any;

const { cacheVersion } = getEnvParams();

const urlsToCache = serviceWorkerOption.assets;

_self.addEventListener('install', (event) => {
  event.waitUntil(initNoteWorker()); // TODO: handle case when DB has deleted

  caches.open(cacheVersion)
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

          caches.open(cacheVersion)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        },
      );
    }));
}
