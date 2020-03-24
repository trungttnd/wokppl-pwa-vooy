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
    localStorage.removeItem('WOKPPL_logoUrl');
    localStorage.removeItem('WOKPPL_canteenName');
    localStorage.removeItem('WOKPPL_canteenId');
    localStorage.removeItem('WOKPPL_gstType');
    localStorage.removeItem('WOKPPL_gst');
  },
}