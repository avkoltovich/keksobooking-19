'use strict';

(function () {
  var advertisements = [];

  var onSuccess = function (data) {
    window.data.advertisements = data;
    window.pins.showPinsBlock(data);
  };

  var onError = function (error) {
    window.error.showErrorPopup(error);
  };

  window.data = {
    advertisements: advertisements,
    onSuccess: onSuccess,
    onError: onError
  };
})();
