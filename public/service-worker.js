// public/service-worker.js
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache-v1')
            .then((cache) =>
                cache.addAll([
                    '/Calendar/',
                    '/Calendar/index.html',
                    '/Calendar/manifest.json',
                    // Add other resources to cache
                ])
            )
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});
