const CACHE_NAME = 'kasworld-cache-v1';
const OFFLINE_URL = '/?m=1';
const ASSETS_TO_CACHE = [
  '/',
  OFFLINE_URL,
  '/favicon.ico',
  '/?m=1',        // your main CSS
  '/p/offline.html',        // your main JS
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiA5410I2c_5I9s0ajiwVAuHMMkGOxZ6DI1ybe3MWFDXDmap1vTvLyQB-04fzN3362jUB69xShjHuAI3wTSsMUp7bq1WfRjvApV30pF39A0Hq60MObs9uFOSVndd_VzKcLzJbngzkmasdUH/s300/K-A-Logo.png.png'   // optional logo
];

// Install event: cache important assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch event: respond with cache first, then network, fallback offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => cachedResponse || fetch(event.request))
      .catch(() => caches.match(OFFLINE_URL))
  );
});
