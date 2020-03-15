'use strict';

(function () {
  var advertisements = [];

  var saveData = function (data) {
    advertisements = data;
  };

  var shareData = function () {
    return advertisements;
  };

  window.data = {
    saveData: saveData,
    shareData: shareData
  };
})();
