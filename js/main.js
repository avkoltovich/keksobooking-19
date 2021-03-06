'use strict';

(function () {
  var INCORRECT_IMAGE_FORMAT_MESSAGE = 'Выбранный файл не картинка';

  var Location = {
    MIN_Y: 130,
    MAX_Y: 630,
    MIN_X: 0,
    MAX_X: 1200
  };

  var MainMapPinDefaultCoords = {
    X: '570px',
    Y: '375px'
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var avatarChoose = adForm.querySelector('.ad-form__field input[type=file]');
  var photosChoose = adForm.querySelector('.ad-form__upload input[type=file]');
  var resetButton = document.querySelector('.ad-form__reset');
  var adGuestNumber = adForm.querySelector('#capacity');
  var mapFilters = document.querySelector('.map__filters');

  var setActiveState = function () {
    window.form.enableAll();
    window.form.fillCurrentAddress();
    adGuestNumber.value = '1';
    window.validation.checkRoomAndGuest();
    window.validation.checkType();
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.backend.download(onSuccessDownload, onErrorDownload);

    adForm.addEventListener('submit', onAdFormSubmit);
    resetButton.addEventListener('click', onAdFormReset);
    mapFilters.addEventListener('change', onMapFilterChange);
    avatarChoose.addEventListener('change', onAdFormAvatarChange);
    photosChoose.addEventListener('change', onAdFormPhotosChange);
  };

  var setInactiveState = function () {
    adForm.reset();
    window.upload.clear();
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
    mapFilters.removeEventListener('change', onMapFilterChange);
    avatarChoose.removeEventListener('change', onAdFormAvatarChange);
    photosChoose.removeEventListener('change', onAdFormPhotosChange);
  };

  var onSuccessDownload = function (data) {
    window.data.save(data);
    window.pins.show(data, window.filter.PIN_MAX_NUMBER);
  };

  var onSuccessUpload = function () {
    window.success.show();
    setInactiveState();
  };

  var onErrorUpload = function (error) {
    window.error.show(error);
  };

  var onErrorDownload = function (error) {
    window.error.show(error);
    setInactiveState();
  };

  var onAdFormSubmit = function (evt) {
    window.backend.upload(new FormData(adForm), onSuccessUpload, onErrorUpload);
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
    if (evt.button === window.utils.MOUSE_BUTTON_MAIN) {
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

  var checkMapBorder = function (min, max, current) {
    if (current < min) {
      return min;
    }
    if (current > max) {
      return max;
    }
    return current;
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

      var minY = Location.MIN_Y - window.form.MainMapPin.HEIGHT;
      var maxY = Location.MAX_Y - window.form.MainMapPin.HEIGHT;
      var currentY = mapPinMain.offsetTop - shift.y;

      var minX = Location.MIN_X - Math.floor(window.form.MainMapPin.WIDTH / 2);
      var maxX = Location.MAX_X - Math.floor(window.form.MainMapPin.WIDTH / 2);
      var currentX = mapPinMain.offsetLeft - shift.x;

      mapPinMain.style.top = checkMapBorder(minY, maxY, currentY) + 'px';
      mapPinMain.style.left = checkMapBorder(minX, maxX, currentX) + 'px';

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

  var onMapFilterChange = window.debounce(function (evt) {
    evt.preventDefault();
    window.card.remove();
    window.pins.remove();
    window.pins.show(window.filter.getAds(window.data.get()), window.filter.PIN_MAX_NUMBER);
  });

  var onAdFormAvatarChange = function () {
    var file = avatarChoose.files[0];
    if (window.upload.check(file)) {
      window.upload.avatar(file);
    } else {
      onErrorUpload(INCORRECT_IMAGE_FORMAT_MESSAGE);
    }
  };

  var onAdFormPhotosChange = function () {
    var file = photosChoose.files[0];
    if (window.upload.check(file)) {
      window.upload.photo(file);
    } else {
      onErrorUpload(INCORRECT_IMAGE_FORMAT_MESSAGE);
    }
  };

  window.upload.clear();
  window.form.disableAll();
  window.form.fillInactiveAddress();

  mapPinMain.addEventListener('mousedown', onMainButtonMousedown);
  mapPinMain.addEventListener('keydown', onEnterKeydown);
  mapPinMain.addEventListener('mousedown', onMainPinMove);
})();
