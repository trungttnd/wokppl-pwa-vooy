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
    badge: 'assets/custom/favicon/android-chrome-icon-32x32.png'
  };
  console.log('title', title)
  if (title != "Order info") {
    let message = dataContent.message;
    let arr = message.split(' ');
    options.body = arr.slice(1, arr.length).join(' ')
    options.data = {
      id: arr[0].substr(1)
    }
    options.actions = [
      { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
      { "action": "no", "title": "No", "icon": "images/no.png" }
    ]
  }


  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.');
  console.log(event)
  let message = event.notification.body;  
  let data = event.notification.data
  event.notification.close();

  if (!event.action) {
    let arr = message.split(' ');
    console.log(arr)
    let id = arr.find(function (el) {
      return el.substr(0, 1) == "#"
    }).substr(1)
    event.waitUntil(
      clients.openWindow('http://localhost:81/wokppl-pwa-vooy/#!inbox-detail?orderNumber=' + id)
    );
  }
  else {

    switch (event.action) {
      case 'yes':
        event.waitUntil(
          clients.openWindow('http://localhost:81/wokppl-pwa-vooy/#!survey?surveyId=' + data.id)
        );
        break;
      default:
        break
    }
  }

});