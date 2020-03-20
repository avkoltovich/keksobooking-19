'use strict';

(function () {
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
    return housingType.value === ad.offer.type;
  };

  var getFilteredAdsByPrice = function (ad) {
    return priceRangeMap[housingPrice.value].MIN <= ad.offer.price && priceRangeMap[housingPrice.value].MAX >= ad.offer.price;
  };

  var getFilteredAdsByRooms = function (ad) {
    return (parseFloat(housingRooms.value) === ad.offer.rooms);
  };

  var getFilteredAdsByGuests = function (ad) {
    return (parseFloat(housingGuests.value) === ad.offer.guests);
  };

  var getCheckedFeatures = function () {
    return Array.from(housingFeatures.querySelectorAll('input:checked')).map(function (ad) {
      return ad.value;
    });
  };

  var getFilteredAdsByFeatures = function (ad) {
    return getCheckedFeatures().every(function (feature) {
      return ad.offer.features.includes(feature);
    });
  };

  var getFilteredAds = function (ads) {
    var filteredAds = ads;
    var checkedFeatures = getCheckedFeatures();
    if (housingType.value !== 'any') {
      filteredAds = filteredAds.filter(getFilteredAdsByType);
    }
    if (housingPrice.value !== 'any') {
      filteredAds = filteredAds.filter(getFilteredAdsByPrice);
    }
    if (housingRooms.value !== 'any') {
      filteredAds = filteredAds.filter(getFilteredAdsByRooms);
    }
    if (housingGuests.value !== 'any') {
      filteredAds = filteredAds.filter(getFilteredAdsByGuests);
    }
    if (checkedFeatures.length > 0) {
      filteredAds = filteredAds.filter(getFilteredAdsByFeatures);
    }
    return filteredAds;
  };

  window.filter = {
    getAds: getFilteredAds
  };
})();
