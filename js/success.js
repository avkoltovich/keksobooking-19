'use strict';

(function () {
  var onSuccess = function (data) {
    window.data.saveData(data);
    window.pins.showPinsBlock(data);
  };

  window.success = {
    onSuccess: onSuccess
  };
})();
