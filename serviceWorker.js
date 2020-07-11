var cacheName = 'cache-v3';

/* 
* Files to be served from cache
*/
var files = [
    './',
    './aero.html',
    './index.html',
    './css/styles.css',
    '/js/notify.js',
    '/js/app.js',
    '/js/sync.js',
    '/js/push.js',
    '/js/networkChange.js',
    './manifest.json',
    'https://3.bp.blogspot.com/-LWBcmlIv6HY/XwlEqx7LUMI/AAAAAAAAFNg/hFI24yPnk6EsQqjSTMHCKAvlK2HApklDACPcBGAsYHg/s16/K-A-Logo.png.png',
    'https://3.bp.blogspot.com/-LWBcmlIv6HY/XwlEqx7LUMI/AAAAAAAAFNg/hFI24yPnk6EsQqjSTMHCKAvlK2HApklDACPcBGAsYHg/s32/K-A-Logo.png.png',
    'https://3.bp.blogspot.com/-LWBcmlIv6HY/XwlEqx7LUMI/AAAAAAAAFNg/hFI24yPnk6EsQqjSTMHCKAvlK2HApklDACPcBGAsYHg/s192/K-A-Logo.png.png',
    'https://3.bp.blogspot.com/-LWBcmlIv6HY/XwlEqx7LUMI/AAAAAAAAFNg/hFI24yPnk6EsQqjSTMHCKAvlK2HApklDACPcBGAsYHg/s256/K-A-Logo.png.png',
    'https://3.bp.blogspot.com/-LWBcmlIv6HY/XwlEqx7LUMI/AAAAAAAAFNg/hFI24yPnk6EsQqjSTMHCKAvlK2HApklDACPcBGAsYHg/s512/K-A-Logo.png.png',
    "https://kasworld-aero.blogspot.com",
    "https://use.fontawesome.com/releases/v5.2.0/css/all.css"
];


self.addEventListener('install', (event) => {
    console.info('Installing Service Worker');
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                return cache.addAll(files)
                    .then(() => {
                        console.info('Sucessfully Cached');
                        return self.skipWaiting();
                    })
                    .catch((error) => {
                        console.error('Failed to cache', error);
                    })
            })
    );
});

self.addEventListener('activate', (event) => {
    console.info('Activating service worker');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.info('Event: Fetch');
    var request = event.request;
    event.respondWith(
        /**
         * Add caching strategy here
         * e.g. Cache first
         */
        caches.match(request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(request).then((response) => {
                var responseToCache = response.clone();
                caches.open(cacheName).then((cache) => {
                    cache.put(request, responseToCache).catch((err) => {
                        console.warn(request.url + ': ' + err.message);
                    });
                });
                return response;
            });
        })
    );
});

self.addEventListener('push', (event) => {
    console.info('Event: Push', event);
    event.waitUntil(self.registration.showNotification("test notification", {body: event.body}));
});


self.addEventListener('sync', function(event) {
    console.info('Event: Sync', event);
    /**
     * Add logic to send requests to backend when sync happens
     */
    self.registration.showNotification("Syncing Now");
  });


  
