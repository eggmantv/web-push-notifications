window.addEventListener('load', function() {
  if ('PushManager' in window) {
    askPermission()
    .then(function() {
      if ('serviceWorker' in navigator) {
        // 这个文件必须和当前网站在同一个域名下
        registerServiceWorker('/service-worker.js');
        navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
          subscribePush(serviceWorkerRegistration);
        });
      } else {
        console.log("不支持serviceWorker");
      }
    })
    .catch(function(err) {
      console.log('Notification被拒绝');
    })
  } else {
    console.log("不支持Push");
  }
})


function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function registerServiceWorker(workerFile) {
  return navigator.serviceWorker.register(workerFile)
  .then(function(registration) {
    console.log('service worker registered!')
    return registration;
  })
  .catch(function(err) {
    console.error('unable to register service worker', err);
  });
}

function askPermission() {
  return new Promise(function(resolve, reject) {
    // permissonResult: granted | default | denied
    var permissonResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissonResult) {
      permissonResult.then(resolve, reject);
    }
  })
  .then(function(permissonResult) {
    if (permissonResult !== 'granted') {
      throw new Error('notification denied!');
    }
  })
}

function subscribePush(registration) {
  var subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(AppConfig.PUBLIC_SERVER_KEY)
  };
  return registration.pushManager.subscribe(subscribeOptions)
  .then(function(pushSubscription) {
    fetch('/web_push_endpoints',
      {method: 'POST', body: JSON.stringify(pushSubscription)})
    .then(function(response) {
      if (response.ok == true) {
        response.json().then(function(data){
          if (data.status == 'ok') {
            console.log('push subscription: ', JSON.stringify(pushSubscription));
          }
        })
      }
    });

    return pushSubscription;
  });
}
