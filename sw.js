// Service Worker for Portfolio PWA
const CACHE_NAME = 'portfolio-v4'; // Bumped version to force cache refresh
const urlsToCache = [
    '/',
    '/index.html',
    '/projects.html',
    '/case-studies.html',
    '/insights.html',
    '/styles.css',
    '/script.js',
    '/logo.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('💾 Opened cache');
                return cache.addAll(urlsToCache).catch(err => {
                    console.error('Failed to cache some resources:', err);
                    // Continue even if some resources fail to cache
                    return Promise.resolve();
                });
            })
    );
    // Force the new service worker to become active immediately
    self.skipWaiting();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip API calls and external requests
    const url = new URL(event.request.url);
    if (url.pathname.startsWith('/api/') || url.origin !== location.origin) {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // Clone the response to cache it
                if (response.ok) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return response;
            })
            .catch(error => {
                // Network fetch failed, try cache
                return caches.match(event.request)
                    .then(cachedResponse => {
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // If not in cache, return a generic error response
                        console.error('Fetch failed and no cache available:', error);
                        throw error;
                    });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('🗑️ Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    // Claim all clients immediately
    return self.clients.claim();
});
