here/* Service Worker - EDUC National
   Changer VERSION à chaque mise à jour de l'application pour forcer le rafraîchissement. */
const VERSION = 'v11';
const CACHE_STATIC = 'educ-static-' + VERSION;
const CACHE_RUNTIME = 'educ-runtime-' + VERSION;

// Fichiers de base mis en cache à l'installation (un fichier manquant ne bloque plus l'installation)
const PRECACHE = [
  './',
  'index.html',
  'manifest.json',
  'questions.js',
  'security.js',
  'logoo.png',
  'histoire.png',
  'Président.png',
  'première_ ministre.png',
  'ministre.png',
  'sec.png',
  'directeur.png',
  '1.png', '2.png', '3.png', '4.png',
  'file_000000003a80820eac24bb81772048a3.png',
  'file_000000000550820e9501e448746b074a.png',
  'file_000000007e5c820ea20863b778ee0a24.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) =>
      Promise.all(PRECACHE.map((url) => cache.add(encodeURI(url)).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_STATIC && k !== CACHE_RUNTIME).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

// Réseau d'abord (toujours la dernière version), cache si hors connexion
function networkFirst(request, cacheName) {
  return fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        const copy = response.clone();
        caches.open(cacheName).then((c) => c.put(request, copy));
      }
      return response;
    })
    .catch(() => caches.match(request).then((r) => r || caches.match('index.html')));
}

// Cache d'abord (images, PDF), mise à jour discrète en arrière-plan
function cacheFirst(request, cacheName) {
  return caches.match(request).then((cached) => {
    const refresh = fetch(request).then((response) => {
      if (response && response.status === 200) {
        const copy = response.clone();
        caches.open(cacheName).then((c) => c.put(request, copy));
      }
      return response;
    }).catch(() => cached);
    return cached || refresh;
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (request.headers.has('range')) return; // lecture des PDF par morceaux : on laisse le navigateur faire

  const url = new URL(request.url);

  // Actualités (API) et tout autre service externe : jamais mis en cache
  if (url.origin !== self.location.origin) {
    const fontsOuLib = /fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com/.test(url.hostname);
    if (fontsOuLib) event.respondWith(cacheFirst(request, CACHE_RUNTIME));
    return;
  }

  // Page principale, scripts, styles, manifeste : toujours la version la plus récente
  if (request.mode === 'navigate' || /\.(html|js|json|css)$/i.test(url.pathname) || url.pathname.endsWith('/')) {
    event.respondWith(networkFirst(request, CACHE_STATIC));
    return;
  }

  // Images, PDF et autres fichiers : rapides depuis le cache
  event.respondWith(cacheFirst(request, CACHE_RUNTIME));
});

// Ouvre l'application quand on touche une notification de rappel
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow('./');
    })
  );
});
