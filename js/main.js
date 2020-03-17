'use strict';

(function () {
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;
  var LOCATION_MIN_X = 25;
  var map = document.querySelector('.map');
  var locationMaxX = map.offsetWidth - 25;
  var mainMapPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');
  var adGuestNumber = adForm.querySelector('#capacity');
  var mainMapPinDefaultCoords = {
    x: '570px',
    y: '375px'
  };

  var setActiveState = function () {
    window.form.enableAll();
    window.form.fillCurrentAddress();
    adGuestNumber.value = '1';
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.backend.download(onSuccessDownload, onError);

    adForm.addEventListener('submit', onAdFormSubmit);
    resetButton.addEventListener('click', onAdFormReset);
  };

  var setInactiveState = function () {
    adForm.reset();
    window.form.disableAll();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.card.remove();
    window.pins.remove();
    mainMapPin.style.left = mainMapPinDefaultCoords.x;
    mainMapPin.style.top = mainMapPinDefaultCoords.y;
    window.form.fillInactiveAddress();

    adForm.removeEventListener('submit', onAdFormSubmit);
    resetButton.removeEventListener('click', onAdFormReset);
    mainMapPin.addEventListener('mousedown', onMainButtonMousedown);
    mainMapPin.addEventListener('keydown', onEnterKeydown);
  };

  var onSuccessDownload = function (data) {
    window.data.save(data);
    window.pins.show(data);
  };

  var onSuccessUpload = function () {
    window.success.show();
    setInactiveState();
  };

  var onError = function (error) {
    window.error.show(error);
  };

  var onAdFormSubmit = function (evt) {
    window.backend.upload(new FormData(adForm), onSuccessUpload, onError);
    evt.preventDefault();
  };

  var onAdFormReset = function (evt) {
    setInactiveState();
    evt.preventDefault();
  };

  var onMainMapMousedown = function () {
    setActiveState();
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

      if (currentY >= LOCATION_MIN_Y && currentY <= LOCATION_MAX_Y) {
        mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      } else if (currentY < LOCATION_MIN_Y) {
        mainMapPin.style.top = LOCATION_MIN_Y - window.form.MAIN_MAP_PIN_HEIGHT + 'px';
      } else if (currentY > LOCATION_MAX_Y) {
        mainMapPin.style.top = LOCATION_MAX_Y - window.form.MAIN_MAP_PIN_HEIGHT + 'px';
      }

      if (currentX >= LOCATION_MIN_X && currentX <= locationMaxX) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      } else if (currentX < LOCATION_MIN_X) {
        mainMapPin.style.left = LOCATION_MIN_X - Math.floor(window.form.MAIN_MAP_PIN_WIDTH / 2) + 'px';
      } else if (currentX > locationMaxX) {
        mainMapPin.style.left = locationMaxX - Math.floor(window.form.MAIN_MAP_PIN_WIDTH / 2) + 'px';
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

  window.form.disableAll();
  window.form.fillInactiveAddress();

  mainMapPin.addEventListener('mousedown', onMainButtonMousedown);
  mainMapPin.addEventListener('keydown', onEnterKeydown);
  mainMapPin.addEventListener('mousedown', onMainPinMove);
})();
