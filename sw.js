const CACHE_NAME = 'itl-v1';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/ITL.jpeg',
  '/images/all.jpeg'
];

// Service Worker එක ඉන්ස්ටෝල් කරන විට අවශ්‍ය ෆයිල් මතක තබා ගැනීම (Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
});

// ඉන්ටර්නෙට් නැති වෙලාවට හෝ වේගය අඩු වෙලාවට Cache එකෙන් දත්ත ලබා දීම
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// පරණ කැචේ (Old Cache) මකා අලුත් එක සක්‍රීය කිරීම
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});
