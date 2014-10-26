/**
 * Tasks Service Worker.
 *
 * Responds to HTTP requests while offline.
 */

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.create('v1').then(function(cache) {
      return cache.add(
        '/index.html',
        '/tasks.css',
        '/tasks.js',
        '/favicon.ico'
      );
    }, function(error) {
        console.log('error populating cache ' + error);
    };
    console.log('populated cache');
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).catch(function() {
      return event.default();
    })
  );
});