'use strict';

(function () {
  var advertisements = [];

  window.data = {
    onSuccess: function (data) {
      window.data.advertisements = data;
      window.pins.showPinsBlock(data);
    },
    onError: function (error) {
      window.error.showErrorPopup(error);
    },
    advertisements: advertisements
  };
})();
