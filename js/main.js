'use strict';

(function () {
  var Location = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 25
  };

  var MainMapPinDefaultCoords = {
    X: '570px',
    Y: '375px'
  };

  var map = document.querySelector('.map');
  var locationMaxX = map.offsetWidth - 25;
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');
  var adGuestNumber = adForm.querySelector('#capacity');
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');

  var setActiveState = function () {
    window.form.enableAll();
    window.form.fillCurrentAddress();
    adGuestNumber.value = '1';
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.backend.download(onSuccessDownload, onError);

    adForm.addEventListener('submit', onAdFormSubmit);
    resetButton.addEventListener('click', onAdFormReset);
    housingType.addEventListener('change', onHousingTypeChange);
    housingPrice.addEventListener('change', onPriceTypeChange);
  };

  var setInactiveState = function () {
    adForm.reset();
    window.form.disableAll();
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.card.remove();
    window.pins.remove();
    mapPinMain.style.left = MainMapPinDefaultCoords.X;
    mapPinMain.style.top = MainMapPinDefaultCoords.Y;
    window.form.fillInactiveAddress();

    adForm.removeEventListener('submit', onAdFormSubmit);
    resetButton.removeEventListener('click', onAdFormReset);
    mapPinMain.addEventListener('mousedown', onMainButtonMousedown);
    mapPinMain.addEventListener('keydown', onEnterKeydown);
    housingType.removeEventListener('change', onHousingTypeChange);
    housingPrice.removeEventListener('change', onPriceTypeChange);
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
    if (evt.button === window.utils.MouseButton.MAIN) {
      onMainMapMousedown();
      mapPinMain.removeEventListener('mousedown', onMainButtonMousedown);
      mapPinMain.removeEventListener('keydown', onEnterKeydown);
    }
  };

  var onEnterKeydown = function (evt) {
    if (evt.key === window.utils.Key.ENTER) {
      onMainMapMousedown();
      mapPinMain.removeEventListener('keydown', onEnterKeydown);
      mapPinMain.removeEventListener('mousedown', onMainButtonMousedown);
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

      var currentX = mapPinMain.offsetLeft + Math.floor(window.form.MainMapPin.WIDTH / 2);
      var currentY = mapPinMain.offsetTop + window.form.MainMapPin.HEIGHT;

      if (currentY >= Location.MIN_Y && currentY <= Location.MAX_Y) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      } else if (currentY < Location.MIN_Y) {
        mapPinMain.style.top = Location.MIN_Y - window.form.MainMapPin.HEIGHT + 'px';
      } else if (currentY > Location.MAX_Y) {
        mapPinMain.style.top = Location.MAX_Y - window.form.MainMapPin.HEIGHT + 'px';
      }

      if (currentX >= Location.MIN_X && currentX <= locationMaxX) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      } else if (currentX < Location.MIN_X) {
        mapPinMain.style.left = Location.MIN_X - Math.floor(window.form.MainMapPin.WIDTH / 2) + 'px';
      } else if (currentX > locationMaxX) {
        mapPinMain.style.left = locationMaxX - Math.floor(window.form.MainMapPin.WIDTH / 2) + 'px';
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

  var onHousingTypeChange = function (evt) {
    evt.preventDefault();
    window.card.remove();
    window.pins.remove();
    window.pins.show(window.filter.getFilteredAds());
  };

  var onPriceTypeChange = function (evt) {
    evt.preventDefault();
    window.card.remove();
    window.pins.remove();
    window.pins.show(window.filter.getFilteredAdsByPrice());
  };

  window.form.disableAll();
  window.form.fillInactiveAddress();

  mapPinMain.addEventListener('mousedown', onMainButtonMousedown);
  mapPinMain.addEventListener('keydown', onEnterKeydown);
  mapPinMain.addEventListener('mousedown', onMainPinMove);
})();
