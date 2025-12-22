// ==================== Service Worker ====================

const CACHE_NAME = 'portfolio-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/projects.html',
    '/case-studies.html',
    '/insights.html',
    '/changelog.html',
    '/styles.css',
    '/styles/tokens.css',
    '/styles/base.css',
    '/styles/components.css',
    '/styles/animations.css',
    '/styles/utilities.css',
    '/styles/pages.css',
    '/js/core.js',
    '/js/ui.js',
    '/js/navigation.js',
    '/js/forms.js',
    '/js/analytics.js',
    '/assets/logo.jpg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Clearing old cache');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Stale-while-revalidate strategy
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Update cache with new response
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            });

            // Return cached response immediately if available, otherwise wait for network
            return cachedResponse || fetchPromise;
        })
    );
});
