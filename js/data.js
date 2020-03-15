'use strict';

(function () {
  var advertisements = [];

  var saveData = function (data) {
    advertisements = data;
  };

  var getData = function () {
    return advertisements;
  };

  window.data = {
    save: saveData,
    get: getData
  };
})();
