'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsWrapper = map.querySelector('.map__pins');
  var mainMapPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adGuestNumber = adForm.querySelector('#capacity');

  var onMainMapMousedown = function () {
    window.form.enableAllForms();
    window.form.fillCurrentAddress();
    adGuestNumber.value = '1';
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    var randomAds = window.mocks.createAds(window.mocks.NUMBER_OF_ADS);
    mapPinsWrapper.appendChild(window.pins.createPinsBlock(randomAds));
  };

  var onMainButtonMousedown = function (evt) {
    if (evt.button === window.utils.MAIN_MOUSE_BUTTON) {
      onMainMapMousedown();
      mainMapPin.removeEventListener('mousedown', onMainButtonMousedown);
      mainMapPin.removeEventListener('keydown', onEnterKeydown);
    }
  };

  var onEnterKeydown = function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      onMainMapMousedown();
      mainMapPin.removeEventListener('keydown', onEnterKeydown);
      mainMapPin.removeEventListener('mousedown', onMainButtonMousedown);
    }
  };

  mainMapPin.addEventListener('mousedown', onMainButtonMousedown);
  mainMapPin.addEventListener('keydown', onEnterKeydown);
})();
