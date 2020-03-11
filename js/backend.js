'use strict';

(function () {
  var mapPinsWrapper = document.querySelector('.map__pins');

  window.backend = {
    onSuccess: function (ads) {
      mapPinsWrapper.appendChild(window.pins.createPinsBlock(ads));
    }
  };
})();
