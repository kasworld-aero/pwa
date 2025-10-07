
if ('serviceWorker' in navigator) {
  const swCode = `
    const cacheName = 'kasworld-cache-v1';
    const filesToCache = ['https://kasworld-aero.blogspot.com', 'https://kasworld-aero.blogspot.com/favicon.ico'];
    self.addEventListener('install', e => {
      e.waitUntil(caches.open(cacheName).then(cache => cache.addAll(filesToCache)));
    });
    self.addEventListener('fetch', e => {
      e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
    });
  `;
  const blob = new Blob([swCode], { type: 'application/javascript' });
  const swUrl = URL.createObjectURL(blob);
  
  navigator.serviceWorker.register(swUrl)
    .then(() => console.log('Service Worker registered via Blob'))
    .catch(err => console.error('Service Worker registration failed:', err));
}

