// const staticCacheName = 'static-site';
// const dynamicCacheName = 'dynamic-site';

// const ASSETS = [
//   '/',
//   '/index.html',
// ];

self.addEventListener('install', async (event) => {
  console.log('install', event)

  // const cache = await caches.open(staticCacheName);
  // await cache.addAll(ASSETS);
});

self.addEventListener('activate', async (event) => {
  console.log('activate', event)

  // const cachesKeysArr = await caches.keys();
  // await Promise.all(cachesKeysArr.filter((key) => key !== staticCacheName && key !== dynamicCacheName).map((key) => caches.delete(key)));
});

// self.addEventListener('fetch', (event) => {
  // console.log('fetch', event)
  // event.respondWith(cacheFirst(event.request));
// })

// async function cacheFirst(request:type) {
//   const cached = await caches.match(request)
//   try {
//     return cached ?? await fetch(request).then((response) => {
//       return networkFirst(response);
//     });
//   } catch (error) {
//     return networkFirst(request);
//   }
// }

// async function networkFirst(request:type) {
//   const cache = await caches.open(dynamicCacheName);
//   try {
//     const response = await fetch(request);
//     await cache.put(request, response.clone());
//     return response;
//   } catch (error) {
//     const cached = await caches.match(request);
//     return cached ?? await caches.match('/');
//   }
// }
