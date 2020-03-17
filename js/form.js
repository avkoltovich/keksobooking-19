'use strict';

(function () {
  var MainMapPin = {
    WIDTH: 65,
    HEIGHT: 87
  };

  var FormStatus = {
    ENABLED: false,
    DISABLED: true
  };

  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilterForm = document.querySelector('.map__filters');
  var mapFilterSelectList = mapFilterForm.querySelectorAll('.map__filter');
  var mapFilterFieldset = mapFilterForm.querySelector('.map__features');
  var adAddress = adForm.querySelector('#address');

  var toggleDisabledFormItems = function (list, isDisabled) {
    for (var i = 0; i < list.length; i++) {
      list[i].disabled = isDisabled;
    }
  };

  var disableAllForms = function () {
    toggleDisabledFormItems(adFieldsets, FormStatus.DISABLED);
    toggleDisabledFormItems(mapFilterSelectList, FormStatus.DISABLED);
    toggleDisabledFormItems(mapFilterFieldset, FormStatus.DISABLED);
  };

  var fillInactiveAddress = function () {
    adAddress.value = (mapPinMain.offsetLeft + Math.floor(MainMapPin.WIDTH / 2)) + ', ' + (mapPinMain.offsetTop + Math.floor(MainMapPin.HEIGHT / 2));
  };

  var enableAllForms = function () {
    toggleDisabledFormItems(adFieldsets, FormStatus.ENABLED);
    toggleDisabledFormItems(mapFilterSelectList, FormStatus.ENABLED);
    toggleDisabledFormItems(mapFilterFieldset, FormStatus.ENABLED);
  };

  var fillCurrentAddress = function () {
    adAddress.value = (mapPinMain.offsetLeft + Math.floor(MainMapPin.WIDTH / 2)) + ', ' + (mapPinMain.offsetTop + MainMapPin.HEIGHT);
  };

  window.form = {
    MainMapPin: MainMapPin,
    enableAll: enableAllForms,
    disableAll: disableAllForms,
    fillInactiveAddress: fillInactiveAddress,
    fillCurrentAddress: fillCurrentAddress
  };
})();
