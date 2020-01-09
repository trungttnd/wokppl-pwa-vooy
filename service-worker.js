/* Import Workbox */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

/* Workbox Config */
workbox.setConfig({
  debug: false
});

/* Cache HTML */
workbox.routing.registerRoute(
  /.*\.html/,
  workbox.strategies.networkFirst({
    cacheName: 'cache-html',
    networkTimeoutSeconds: 3
  })
);

/* Cache CSS */
workbox.routing.registerRoute(
  /.*\.css/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-css'
  })
);

/* Cache JS */
workbox.routing.registerRoute(
  /.*\.js/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-js'
  })
);

/* Cache Images */
workbox.routing.registerRoute(
  /.*\.(?:gif|jpeg|jpg|png|svg)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-img'
  })
);

/* Cache Fonts */
workbox.routing.registerRoute(
  /.*\.(?:eot|otf|ttf|woff|woff2)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-font'
  })
);

/*Notify*/
self.addEventListener('push', function (event) {
  //console.log('[Service Worker] Push Received.');
  //console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  let dataContent = JSON.parse(event.data.text());
  const title = dataContent.title;
  const options = {
    body: dataContent.message,
    icon: 'assets/custom/favicon/android-chrome-icon-96x96.png',
    badge: 'assets/custom/favicon/android-chrome-icon-96x96.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');

    event.notification.close();

    event.waitUntil(
      clients.openWindow('https://preorder-pwa.netlify.com/')
    );
});