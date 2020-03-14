'use strict';

(function () {
  var MAIN_MAP_PIN_WIDTH = 65;
  var MAIN_MAP_PIN_HEIGHT = 87;

  var FORM_ENABLED = false;
  var FORM_DISABLED = true;

  var mainMapPin = document.querySelector('.map__pin--main');
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
    toggleDisabledFormItems(adFieldsets, FORM_DISABLED);
    toggleDisabledFormItems(mapFilterSelectList, FORM_DISABLED);
    toggleDisabledFormItems(mapFilterFieldset, FORM_DISABLED);
  };

  var fillInactiveAddress = function () {
    adAddress.value = (mainMapPin.offsetLeft + Math.floor(MAIN_MAP_PIN_WIDTH / 2)) + ', ' + (mainMapPin.offsetTop + Math.floor(MAIN_MAP_PIN_HEIGHT / 2));
  };

  var enableAllForms = function () {
    toggleDisabledFormItems(adFieldsets, FORM_ENABLED);
    toggleDisabledFormItems(mapFilterSelectList, FORM_ENABLED);
    toggleDisabledFormItems(mapFilterFieldset, FORM_ENABLED);
  };

  var fillCurrentAddress = function () {
    adAddress.value = (mainMapPin.offsetLeft + Math.floor(MAIN_MAP_PIN_WIDTH / 2)) + ', ' + (mainMapPin.offsetTop + MAIN_MAP_PIN_HEIGHT);
  };

  disableAllForms();
  fillInactiveAddress();

  window.form = {
    MAIN_MAP_PIN_WIDTH: MAIN_MAP_PIN_WIDTH,
    MAIN_MAP_PIN_HEIGHT: MAIN_MAP_PIN_HEIGHT,
    enableAllForms: enableAllForms,
    fillCurrentAddress: fillCurrentAddress
  };
})();
