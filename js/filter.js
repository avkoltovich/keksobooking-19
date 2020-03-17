'use strict';

(function () {
  var PinFilter = {
    MAX_NUMBER: 5
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var getFilteredAds = function () {
    var data = window.data.get();
    if (housingType.value === 'any') {
      return data;
    }
    var filteredAds = data.filter(function (ad) {
      return housingType.value === ad.offer.type;
    });
    return filteredAds;
  };

  window.filter = {
    PinFilter: PinFilter,
    getFilteredAds: getFilteredAds
  };
})();
