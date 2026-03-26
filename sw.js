const CACHE = 'tracker-v11';
const ASSETS = ['tracker.html', 'tracker.js', 'tracker.css', 'icon.svg'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
  self.clients.claim();
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Cache-first voor eigen assets, network-first voor al het andere (Supabase, kaart)
  if (url.origin === self.location.origin && ASSETS.some(a => url.pathname.endsWith(a))) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
