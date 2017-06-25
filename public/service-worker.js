self.addEventListener('push', function(event) {
  // console.log('push event: ', event);
  var data = event.data.json();

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      tag: data.tag,
      data: {url: data.url}
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function(clientList) {
    if (event.notification.data && event.notification.data.url) {
      return clients.openWindow(event.notification.data.url);
    } else {
      return clients.openWindow("https://eggman.tv");
    }
  }));
});
