self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('kasworld-cache').then(function(cache) {
            return cache.addAll([
                '/',
                'https://kasworld-aero.blogspot.com/',
                'https://cdn.jsdelivr.net/gh/kasworld-aero/pwa/cdn/manifest.json',
'https://kasworld-aero.blogspot.com/feeds/posts/default',
'https//www.blogger.com/feeds/9090379976702614384/posts/default',
'https://kasworld-aero.blogspot.com/feeds/posts/default?alt=rss',
'https://cdn.jsdelivr.net/gh/kasworld-aero/pwa/cdn/service-worker.js',
                '/https://3.bp.blogspot.com/-LWBcmlIv6HY/XwlEqx7LUMI/AAAAAAAAFNg/hFI24yPnk6EsQqjSTMHCKAvlK2HApklDACPcBGAsYHg/s192/K-A-Logo.png.png',
'https://3.bp.blogspot.com/-LWBcmlIv6HY/XwlEqx7LUMI/AAAAAAAAFNg/hFI24yPnk6EsQqjSTMHCKAvlK2HApklDACPcBGAsYHg/s512/K-A-Logo.png.png',
'https://kasworld-aero.blogspot.com//favicon.ico',
'https://kasworld-aero.blogspot.com/feeds/posts/default/-/Travel?alt=json-in-script&max-results=5&callback=mbtlist',
'https://kasworld-aero.blogspot.com/feeds/posts/default/-/Aircraft?alt=json-in-script&max-results=5&callback=mbtlist',
                // Add other assets you want to cache
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
