/* Service Worker - EDUC National
   Changer VERSION à chaque mise à jour de l'application pour forcer le rafraîchissement. */
const VERSION = 'v21';
const CACHE_STATIC = 'educ-static-' + VERSION;
const CACHE_RUNTIME = 'educ-runtime-' + VERSION;
const CACHE_META = 'educ-meta'; // réglages des rappels (conservés entre les versions)

// Tout ce qu'il faut pour OUVRIR l'application sans Internet
const PRECACHE = [
  './', 'index.html', 'offline.html', 'manifest.json',
  'config.js', 'security.js', 'quiz.js', 'news.js', 'notifications.js', 'search.js', 'brevet.js',
  'questions-facile.js', 'questions-difficile.js', 'questions-pro.js',
  'logoo.png', 'histoire.png', 'Président.png', 'première_ ministre.png', 'ministre.png', 'sec.png', 'directeur.png',
  '1.png', '2.png', '3.png', '4.png',
  'file_000000003a80820eac24bb81772048a3.png', 'file_000000000550820e9501e448746b074a.png', 'file_000000007e5c820ea20863b778ee0a24.png'
];
// Polices et icônes externes (gardées en mémoire pour que l'interface reste belle hors connexion)
const EXTERNES = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2',
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => Promise.all([
      ...PRECACHE.map((url) => cache.add(encodeURI(url)).catch(() => null)),
      ...EXTERNES.map((url) => fetch(new Request(url, { mode: 'no-cors' })).then((r) => cache.put(url, r)).catch(() => null))
    ])).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_STATIC && k !== CACHE_RUNTIME && k !== CACHE_META).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function avecDelai(p, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('delai')), ms);
    p.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}
const cachable = (r) => r && (r.status === 200 || r.type === 'opaque');
const pageHorsLigne = (request) => request.mode === 'navigate' ? caches.match('offline.html') : Response.error();

// Réseau d'abord (dernière version), avec délai limite pour les réseaux lents, puis copie en mémoire
function networkFirst(request, cacheName) {
  return avecDelai(fetch(request), 4000)
    .then((response) => {
      if (cachable(response)) { const copy = response.clone(); caches.open(cacheName).then((c) => c.put(request, copy)); }
      return response;
    })
    .catch(() => caches.match(request, { ignoreSearch: true })
      .then((r) => r || (request.mode === 'navigate' ? caches.match(/\.pdf$/i.test(new URL(request.url).pathname) ? 'offline.html' : 'index.html') : null))
      .then((r) => r || fetch(request).catch(() => pageHorsLigne(request))));
}

// Cache d'abord (images, PDF déjà ouverts), mise à jour discrète en arrière-plan
function cacheFirst(request, cacheName) {
  return caches.match(request).then((cached) => {
    const refresh = fetch(request).then((response) => {
      if (cachable(response)) { const copy = response.clone(); caches.open(cacheName).then((c) => c.put(request, copy)); }
      return response;
    }).catch(() => cached || pageHorsLigne(request));
    return cached || refresh;
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (request.headers.has('range')) return;
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    if (/fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com/.test(url.hostname)) event.respondWith(cacheFirst(request, CACHE_RUNTIME));
    return; // actualités et autres services externes : jamais en mémoire
  }
  if (request.mode === 'navigate' || /\.(html|js|json|css)$/i.test(url.pathname) || url.pathname.endsWith('/')) {
    event.respondWith(networkFirst(request, CACHE_STATIC));
    return;
  }
  event.respondWith(cacheFirst(request, CACHE_RUNTIME));
});

/* ---------- Rappels d'étude ---------- */
const META_URL = '/__educ_rappel';
const MESSAGES = [
  "C'est l'heure d'étudier ! Une question de réflexion t'attend 🇨🇩",
  'Un petit quiz sur la citoyenneté ? Gagne de l\'XP avec Manassé IA !',
  'Aimer son pays, c\'est aussi apprendre. Ouvre EDUC National.',
  'Maintiens ta série d\'apprentissage : quelques minutes suffisent.'
];
function afficherRappel() {
  return self.registration.showNotification('EDUC National', {
    body: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    icon: 'logoo.png', badge: 'logoo.png', tag: 'educ-rappel', renotify: true, vibrate: [120, 60, 120], data: { tab: 'tab-quiz' }
  });
}
async function lireMeta() {
  try { const c = await caches.open(CACHE_META), r = await c.match(META_URL); return r ? await r.json() : {}; } catch (e) { return {}; }
}
async function ecrireMeta(o) {
  try { const c = await caches.open(CACHE_META); await c.put(META_URL, new Response(JSON.stringify(o), { headers: { 'Content-Type': 'application/json' } })); } catch (e) {}
}
self.addEventListener('message', async (event) => {
  const d = event.data || {};
  if (d === 'SKIP_WAITING') self.skipWaiting();
  if (d.type === 'REMINDER_SETTINGS') { const m = await lireMeta(); await ecrireMeta(Object.assign(m, { on: !!d.on, h: d.h })); }
  if (d.type === 'REMINDER_SENT') { const m = await lireMeta(); await ecrireMeta(Object.assign(m, { dernier: Date.now() })); }
});
// Synchronisation périodique (Chrome Android, application installée) : rappel même application fermée
self.addEventListener('periodicsync', (event) => {
  if (event.tag !== 'educ-rappel') return;
  event.waitUntil((async () => {
    const m = await lireMeta();
    if (!m.on) return;
    if (Date.now() - (m.dernier || 0) < 20 * 60 * 60 * 1000) return;
    if (new Date().getHours() < (m.h || 18)) return;
    await afficherRappel(); await ecrireMeta(Object.assign(m, { dernier: Date.now() }));
  })());
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const tab = (event.notification.data && event.notification.data.tab) || 'tab-quiz';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if ('focus' in c) { c.postMessage({ type: 'OPEN_TAB', tab }); return c.focus(); } }
      return self.clients.openWindow('./');
    })
  );
});
