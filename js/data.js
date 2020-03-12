'use strict';

(function () {
  var mapPinsWrapper = document.querySelector('.map__pins');
  var advertisements = [];

  window.data = {
    onSuccess: function (data) {
      window.data.advertisements = data;
      mapPinsWrapper.appendChild(window.pins.createPinsBlock(window.data.advertisements));
    },
    advertisements: advertisements
  };
})();
