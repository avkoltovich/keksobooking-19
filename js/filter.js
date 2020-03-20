'use strict';

(function () {
  var PIN_MAX_NUMBER = 5;
  var DEFAULT_INPUT_VALUE = 'any';

  var priceRangeMap = {
    low: {
      MIN: 0,
      MAX: 10000
    },
    middle: {
      MIN: 10000,
      MAX: 50000
    },
    high: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var getFilteredAdsByType = function (ad) {
    if (housingType.value === DEFAULT_INPUT_VALUE ||
      housingType.value === ad.offer.type) {
      return true;
    }
    return false;
  };

  var getFilteredAdsByPrice = function (ad) {
    if (housingPrice.value === DEFAULT_INPUT_VALUE ||
      (priceRangeMap[housingPrice.value].MIN <= ad.offer.price && priceRangeMap[housingPrice.value].MAX >= ad.offer.price)) {
      return true;
    }
    return false;
  };

  var getFilteredAdsByRooms = function (ad) {
    if (housingRooms.value === DEFAULT_INPUT_VALUE ||
      parseFloat(housingRooms.value) === ad.offer.rooms) {
      return true;
    }
    return false;
  };

  var getFilteredAdsByGuests = function (ad) {
    if (housingGuests.value === DEFAULT_INPUT_VALUE ||
      parseFloat(housingGuests.value) === ad.offer.guests) {
      return true;
    }
    return false;
  };

  var getFilteredAdsByFeatures = function (ad) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    var flag = true;
    checkedFeatures.forEach(function (item) {
      flag = flag && ad.offer.features.includes(item.value);
    });
    return flag;
  };

  var getAds = function (ads) {
    var filteredAds = [];
    for (var i = 0; i < ads.length; i++) {
      if (getFilteredAdsByType(ads[i]) && getFilteredAdsByPrice(ads[i]) &&
        getFilteredAdsByGuests(ads[i]) && getFilteredAdsByRooms(ads[i]) &&
        getFilteredAdsByFeatures(ads[i])) {
        filteredAds.push(ads[i]);
        if (filteredAds.length === PIN_MAX_NUMBER) {
          break;
        }
      }
    }
    return filteredAds;
  };

  window.filter = {
    PIN_MAX_NUMBER: PIN_MAX_NUMBER,
    getAds: getAds
  };
})();
