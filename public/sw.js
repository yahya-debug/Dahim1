const cache1 = 'v1';
const cache2 = 'v2';
const cacheA = ['/app.html', '/app.js', '/styles/app.css', '/styles/responsive.css']
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('./sw.js').then(() => {
        // console.log('obj');
      }).catch((err) => {
        console.log(err);
      })
  })
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cache1).then(function (cache) {
      cache.addAll(cacheA);
    }).then(function () {
      self.skipWaiting()
    })
  )
})

self.addEventListener('activate', function (event) {
  // event.waitUntil(
  //   caches.keys().then(function (cacheNames) {
  //     return Promise.all(cacheNames.map(function (cn) {
  //       if (cn !== cache1) {
  //         caches.delete(cn)
  //       }
  //     }));
  //   })
  // )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(fetch(event.request).then(function (res) {
    if (cacheA.includes(event.request.url.replace('http://localhost:1400', ''))) {
      return res;
    }
    let resc = res.clone();
    caches.open(cache2).then(function (cache) {
      cache.put(event.request, resc)
    })
    return res;
  }).catch(function () {
    caches.match(event.request)
  }))
})
