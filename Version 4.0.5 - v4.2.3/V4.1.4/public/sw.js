// Service Worker temporarily disabled for troubleshooting
// This file is kept minimal to prevent caching issues

console.log('Service Worker: Loading (minimal mode)');

// Skip all caching for now
self.addEventListener('install', event => {
  console.log('Service Worker: Install (skipping)');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker: Activate (clearing caches)');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Pass through all requests without caching
self.addEventListener('fetch', event => {
  // Don't intercept any requests - let them go to network
  return;
});
