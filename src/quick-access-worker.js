self.addEventListener('fetch', (event) => {

  let url = new URL(event.request.url, self.registration.scope)

  if (!url.pathname.startsWith('/file')) {
    return
  }

  let responder = self.caches.open('quick-access')
    .then(cache => cache.match(url.pathname))

  event.respondWith(responder)

})

importScripts('./ngsw-worker.js')
