'use strict';

Framework7.utils.custom = {
  configurePushSub: function () {
    if (!('serviceWorker' in navigator)) {
      return;
    }


  },
  urlB64ToUint8Array: function (base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  removeCookie: function () {
    var self = this;
    localStorage.removeItem('WOKPPL_OldUser');
    localStorage.removeItem('WOKPPL_accessToken');
    localStorage.removeItem('WOKPPL_expireInSeconds');
    localStorage.removeItem('WOKPPL_expired');
    localStorage.removeItem('WOKPPL_refreshToken');
    localStorage.removeItem('WOKPPL_mobile');
    localStorage.removeItem('WOKPPL_name');
    localStorage.removeItem('WOKPPL_email');
    localStorage.removeItem('WOKPPL_username');
    localStorage.removeItem('WOKPPL_userId');
    localStorage.removeItem('WOKPPL_passcode');
    localStorage.removeItem('addProduct');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('listOrderSession');
    localStorage.removeItem('listOrderDate');
    localStorage.removeItem('categories');
    localStorage.removeItem('editProduct');
    localStorage.removeItem('sessions');
    localStorage.removeItem('detTransactions');
    localStorage.removeItem('cartAvailable');
  },

  initializeA2HS: function() {
    window.addEventListener('beforeinstallprompt', function(event) {
      event.preventDefault();
      app.a2hs = event;
      var dialog = app.dialog.create({
        title: '',
        content: '<div class="block no-margin no-padding text-align-center" style="font-size: 14px;"><img src="'+ window.config.app.logo +'" width="84" alt="" /><p><b>Add Konbi to your Home Screen?</b></p><p>Install Konbi on your home screen for quick and easy access when you\'re on the go.</p></div>',
        verticalButtons: true,
        buttons: [
          {
            text: 'Add to Home Screen',
            bold: true,
            color: 'green',
            onClick: function() {
              app.a2hs.prompt();
              app.a2hs.userChoice
                .then(function(choice) {
                if (choice.outcome == 'accepted') {
                  app.toast.show({
                    text: 'Yaay! Added to Home Screen',
                    position:'bottom',
                    cssClass: 'toast-round bg-color-green'
                  });
                }
                else {
                  app.toast.show({
                    text: 'Oops! Could not add to Home Screen',
                    position:'bottom',
                    cssClass: 'toast-round bg-color-red'
                  });
                }
                app.a2hs = null;
              });
              app.dialog.close();
            }
          },
          {
            text: 'No, Thanks',
            color: 'gray'
          }
        ]
      });
      setTimeout(function() {
        dialog.open();
      }, 0);
    });
  }
}