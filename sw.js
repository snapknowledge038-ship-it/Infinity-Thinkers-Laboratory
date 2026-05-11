const CACHE_NAME = 'itl-ultimate-cache-v1';

// මූලිකවම ඕන කරන දේවල් විතරක් මෙතනට දාන්න (index එක සහ manifest එක)
const INITIAL_CACHE = [
  '/',
  'index.html',
  'manifest.json',
  'images/ITL.jpeg'
];

// 1. Service Worker එක Install වෙද්දී ප්‍රධාන ෆයිල් ටික සේව් කිරීම
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(INITIAL_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. ඕනෑම පේජ් එකක් ඕපන් කරද්දී ඒක ස්වයංක්‍රීයව Cache කිරීම
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // ඉන්ටර්නෙට් තියෙනවා නම් අලුත්ම පේජ් එක පෙන්වන ගමන් ඒක සේව් කරගන්නවා
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // ඉන්ටර්නෙට් නැතිනම් කලින් සේව් වුණු පේජ් එක හෝ පින්තූරය පෙන්වනවා
        return caches.match(event.request);
      })
  );
});

// 3. පරණ Cache එක අයින් කරලා අලුත් එක Update කිරීම
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
