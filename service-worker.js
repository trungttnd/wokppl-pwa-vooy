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
self.addEventListener('push', function(event) {
  //console.log('[Service Worker] Push Received.');
  //console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);
  let dataContent = JSON.parse(event.data.text());
  const title = dataContent.title;
  const options = {
    body: dataContent.message,
    icon: 'assets/custom/img/konbini-logo-white.svg',
    badge: 'images/badge.png'
  };
  //localStorage.setItem('Konbini_popup', dataContent.title)
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('http://localhost:81/cusPWA/wokppl-pwa-vooy/')
  );
});