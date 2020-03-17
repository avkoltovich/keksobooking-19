'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');


  var getFilteredAds = function () {
    if (housingType.value === 'any') {
      return window.data.get();
    }
    var filteredAds = window.data.get().filter(function (ad) {
      return (housingType.value === ad.offer.type);
    });
    return filteredAds;
  };

  var getFilteredAdsByPrice = function () {
    if (housingPrice.value === 'any') {
      return window.data.get();
    }
    var filteredAds = window.data.get().filter(function (ad) {
      switch (housingPrice.value) {
        case 'middle':
          return ad.offer.price > 10000 && ad.offer.price < 50000;
        case 'low':
          return ad.offer.price < 10000;
        case 'high':
          return ad.offer.price > 50000;
      }
      return false;
    });
    return filteredAds;
  };

  window.filter = {
    getFilteredAds: getFilteredAds,
    getFilteredAdsByPrice: getFilteredAdsByPrice
  };
})();
