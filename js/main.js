'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainMapPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adGuestNumber = adForm.querySelector('#capacity');

  var onMainMapMousedown = function () {
    window.form.enableAllForms();
    window.form.fillCurrentAddress();
    adGuestNumber.value = '1';
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.backend.download(window.data.onSuccess);
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

  var onMainPinMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var currentX = mainMapPin.offsetLeft + Math.floor(window.form.MAIN_MAP_PIN_WIDTH / 2);
      var currentY = mainMapPin.offsetTop + window.form.MAIN_MAP_PIN_HEIGHT;

      if (currentY >= window.mocks.LOCATION_MIN_Y && currentY <= window.mocks.LOCATION_MAX_Y) {
        mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      } else if (currentY < window.mocks.LOCATION_MIN_Y) {
        mainMapPin.style.top = window.mocks.LOCATION_MIN_Y - window.form.MAIN_MAP_PIN_HEIGHT + 'px';
      } else if (currentY > window.mocks.LOCATION_MAX_Y) {
        mainMapPin.style.top = window.mocks.LOCATION_MAX_Y - window.form.MAIN_MAP_PIN_HEIGHT + 'px';
      }

      if (currentX >= window.mocks.LOCATION_MIN_X && currentX <= window.mocks.locationMaxX) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      } else if (currentX < window.mocks.LOCATION_MIN_X) {
        mainMapPin.style.left = window.mocks.LOCATION_MIN_X - Math.floor(window.form.MAIN_MAP_PIN_WIDTH / 2) + 'px';
      } else if (currentX > window.mocks.locationMaxX) {
        mainMapPin.style.left = window.mocks.locationMaxX - Math.floor(window.form.MAIN_MAP_PIN_WIDTH / 2) + 'px';
      }

      window.form.fillCurrentAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.fillCurrentAddress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainMapPin.addEventListener('mousedown', onMainButtonMousedown);
  mainMapPin.addEventListener('keydown', onEnterKeydown);
  mainMapPin.addEventListener('mousedown', onMainPinMove);
})();
