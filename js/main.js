'use strict';

var NUMBER_OF_ADS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PRICES = [10000, 5000, 1000, 0];
var GUESTS = [1, 2, 3];
var ROOMS = [1, 2, 3, 100];
// var ROOM_WORDS = ['комнат', 'комната', 'комнаты'];
// var GUEST_WORDS = ['гостя', 'гостей'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var LOCATION_MIN_X = 25;
// var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';
var MAIN_MOUSE_BUTTON = 0;
var MAIN_MAP_PIN_WIDTH = 65;
var MAIN_MAP_PIN_HEIGHT = 87;
var map = document.querySelector('.map');
// var filtersContainer = map.querySelector('.map__filters-container');
var pinsBlock = map.querySelector('.map__pins');
var mainMapPin = map.querySelector('.map__pin--main');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var locationMaxX = map.offsetWidth - 25;
var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var mapFilterForm = document.querySelector('.map__filters');
var mapFilterSelectList = mapFilterForm.querySelectorAll('.map__filter');
var mapFilterFieldset = mapFilterForm.querySelector('.map__features');
var adAddress = adForm.querySelector('#address');
var adPrice = adForm.querySelector('#price');
var adType = adForm.querySelector('#type');
var adCheckin = adForm.querySelector('#timein');
var adCheckout = adForm.querySelector('#timeout');
var adRoomNumber = adForm.querySelector('#room_number');
var adGuestNumber = adForm.querySelector('#capacity');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var getRandomArrayItem = function (array) {
  return array[getRandomInteger(0, array.length - 1)];
};

var getMixedArray = function (array) {
  var mixedArray = array.slice();
  var j;
  var swap;

  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    swap = mixedArray[i];
    mixedArray[i] = mixedArray[j];
    mixedArray[j] = swap;
  }

  return mixedArray;
};

var getClippedArray = function (array) {
  return array.slice(0, getRandomInteger(1, array.length));
};

var generateRandomAd = function (index) {
  var ad = {
    author: {},
    offer: {},
    location: {}
  };

  ad.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';

  ad.location.x = getRandomInteger(LOCATION_MIN_X, locationMaxX);
  ad.location.y = getRandomInteger(LOCATION_MIN_Y, LOCATION_MAX_Y);

  ad.offer.title = 'Здесь будет заголовок предложения';
  ad.offer.address = ad.location.x + ', ' + ad.location.y;
  ad.offer.price = getRandomArrayItem(PRICES);
  ad.offer.type = getRandomArrayItem(TYPES);
  ad.offer.rooms = getRandomArrayItem(ROOMS);
  ad.offer.guests = getRandomArrayItem(GUESTS);
  ad.offer.checkin = getRandomArrayItem(CHECKIN_TIME);
  ad.offer.checkout = getRandomArrayItem(CHECKOUT_TIME);
  ad.offer.features = getClippedArray(FEATURES);
  ad.offer.description = 'Здесь будет описание';
  ad.offer.photos = getClippedArray(getMixedArray(PHOTOS));

  return ad;
};

var createAds = function (number) {
  var ads = [];

  for (var i = 0; i < number; i++) {
    ads[i] = generateRandomAd(i);
  }

  return ads;
};

var renderAdPin = function (ad) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = (ad.location.x - 25) + 'px';
  pin.style.top = (ad.location.y - 70) + 'px';
  pin.querySelector('img').setAttribute('src', ad.author.avatar);
  pin.querySelector('img').setAttribute('alt', ad.offer.title);

  return pin;
};

var createPinsBlock = function (ads) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAdPin(ads[i]));
  }

  return fragment;
};

// var getCorrectWord = function (number, words) {
//   if (words.length === 2) {
//     return (number % 10 === 1 && number % 100 !== 11) ? words[0] : words[1];
//   }
//   if ((number >= 5 && number <= 19) || (number % 10 >= 5 && number % 10 <= 9) || number % 10 === 0) {
//     return words[0];
//   }
//   return (number % 10 === 1) ? words[1] : words[2];
// };

// var createCard = function (ad) {
//   var card = cardTemplate.cloneNode(true);
//   var popupFeatures = card.querySelector('.popup__features');
//   var popupFeature = card.querySelectorAll('.popup__feature');
//   var popupPhotos = card.querySelector('.popup__photos');
//   var popupPhoto = popupPhotos.querySelector('.popup__photo');

//   card.querySelector('.popup__title').textContent = ad.offer.title;
//   card.querySelector('.popup__text--address').textContent = ad.offer.address;
//   card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

//   var roomType = '';

//   switch (ad.offer.type) {
//     case 'flat':
//       roomType = 'Квартира';
//       break;
//     case 'bungalo':
//       roomType = 'Бунгало';
//       break;
//     case 'house':
//       roomType = 'Дом';
//       break;
//     case 'palace':
//       roomType = 'Дворец';
//       break;
//   }

//   card.querySelector('.popup__type').textContent = roomType;

//   card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' +
//     getCorrectWord(ad.offer.rooms, ROOM_WORDS) + ' для ' + ad.offer.guests + ' ' +
//     getCorrectWord(ad.offer.guests, GUEST_WORDS);
//   card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

//   for (var i = popupFeature.length - 1; i >= ad.offer.features.length; i--) {
//     popupFeatures.removeChild(popupFeature[i]);
//   }

//   card.querySelector('.popup__description').textContent = ad.offer.description;
//   popupPhoto.setAttribute('src', ad.offer.photos[0]);

//   if (ad.offer.photos.length > 1) {
//     for (i = 1; i < ad.offer.photos.length; i++) {
//       var newPopupPhoto = popupPhoto.cloneNode(false);
//       popupPhotos.appendChild(newPopupPhoto);
//       newPopupPhoto.setAttribute('src', ad.offer.photos[i]);
//     }
//   }

//   card.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);

//   return card;
// };

var disableFormItems = function (list) {
  for (var i = 0; i < list.length; i++) {
    list[i].setAttribute('disabled', 'disabled');
  }
};

var enableFormItems = function (list) {
  for (var i = 0; i < list.length; i++) {
    list[i].removeAttribute('disabled');
  }
};

var disableAllForms = function () {
  disableFormItems(adFieldsets);
  disableFormItems(mapFilterSelectList);
  disableFormItems(mapFilterFieldset);
};

var enableAllForms = function () {
  enableFormItems(adFieldsets);
  enableFormItems(mapFilterSelectList);
  enableFormItems(mapFilterFieldset);
};

var onMainMapMousedown = function () {
  enableAllForms();
  fillCurrentAddress();
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  var randomAds = createAds(NUMBER_OF_ADS);
  pinsBlock.appendChild(createPinsBlock(randomAds));
};

var onMainButtonMousedown = function (evt) {
  if (evt.button === MAIN_MOUSE_BUTTON) {
    onMainMapMousedown();
    mainMapPin.removeEventListener('mousedown', onMainButtonMousedown);
  }
};

var onEnterKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    onMainMapMousedown();
    mainMapPin.removeEventListener('keydown', onEnterKeydown);
  }
};

var fillInactiveAddress = function () {
  adAddress.value = (mainMapPin.offsetLeft + Math.floor(MAIN_MAP_PIN_WIDTH / 2)) + ', ' + (mainMapPin.offsetTop + Math.floor(MAIN_MAP_PIN_HEIGHT / 2));
};

var fillCurrentAddress = function () {
  adAddress.value = (mainMapPin.offsetLeft + Math.floor(MAIN_MAP_PIN_WIDTH / 2)) + ', ' + (mainMapPin.offsetTop + MAIN_MAP_PIN_HEIGHT);
};

var onTypeChange = function () {
  switch (adType.value) {
    case 'flat':
      adPrice.setAttribute('min', 1000);
      adPrice.setAttribute('placeholder', 1000);
      break;
    case 'bungalo':
      adPrice.setAttribute('min', 0);
      adPrice.setAttribute('placeholder', 0);
      break;
    case 'house':
      adPrice.setAttribute('min', 5000);
      adPrice.setAttribute('placeholder', 5000);
      break;
    case 'palace':
      adPrice.setAttribute('min', 10000);
      adPrice.setAttribute('placeholder', 10000);
      break;
  }
};

var checkinAndCheckoutSync = function (select, selectToSync) {
  switch (select.value) {
    case '12:00':
      selectToSync.value = '12:00';
      break;
    case '13:00':
      selectToSync.value = '13:00';
      break;
    case '14:00':
      selectToSync.value = '14:00';
      break;
  }
};

var onRoomOrGuestChange = function () {
  adGuestNumber.setCustomValidity('');
  switch (adRoomNumber.value) {
    case '1':
      if (adGuestNumber.value === '0' ||
        adGuestNumber.value === '2' ||
        adGuestNumber.value === '3') {
        adGuestNumber.setCustomValidity('«для 1 гостя»');
      }
      break;
    case '2':
      if (adGuestNumber.value === '0' ||
        adGuestNumber.value === '3') {
        adGuestNumber.setCustomValidity('«для 2 гостей» или «для 1 гостя»');
      }
      break;
    case '3':
      if (adGuestNumber.value === '0') {
        adGuestNumber.setCustomValidity('«для 3 гостей», «для 2 гостей» или «для 1 гостя»');
      }
      break;
    case '100':
      if (adGuestNumber.value === '1' ||
        adGuestNumber.value === '2' ||
        adGuestNumber.value === '3') {
        adGuestNumber.setCustomValidity('«не для гостей»');
      }
      break;
  }
};

var onCheckinChange = function () {
  checkinAndCheckoutSync(adCheckin, adCheckout);
};

var onCheckoutChange = function () {
  checkinAndCheckoutSync(adCheckout, adCheckin);
};


disableAllForms();
fillInactiveAddress();
onRoomOrGuestChange();

adRoomNumber.addEventListener('change', onRoomOrGuestChange);
adGuestNumber.addEventListener('change', onRoomOrGuestChange);
adCheckin.addEventListener('change', onCheckinChange);
adCheckout.addEventListener('change', onCheckoutChange);
adType.addEventListener('change', onTypeChange);
mainMapPin.addEventListener('mousedown', onMainButtonMousedown);
mainMapPin.addEventListener('keydown', onEnterKeydown);

// map.insertBefore(createCard(randomAds[0]), filtersContainer);
