'use strict';

var NUMBER_OF_ADS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES_OF_CHECK_IN = ['12:00', '13:00', '14:00'];
var TIMES_OF_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var LOCATION_MIN_X = 25;
var map = document.querySelector('.map');
var pinsBlock = map.querySelector('.map__pins');
var PinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var locationMaxX = map.offsetWidth - 25;

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var getRandomArrayIndex = function (array) {
  return getRandomInteger(0, array.length - 1);
};

var getRandomArrayItem = function (array) {
  return array[getRandomArrayIndex(array)];
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
  var clippedArray = [];

  for (var i = 0; i < getRandomArrayIndex(array); i++) {
    clippedArray.push(array[i]);
  }

  return clippedArray;
};

var generateArrayOfAvatars = function (number) {
  var ArrayOfAvatar = [];

  for (var i = 0; i < number; i++) {
    ArrayOfAvatar[i] = 'img/avatars/user0' + (i + 1) + '.png';
  }

  return ArrayOfAvatar;
};

var generateRandomAd = function (avatars) {
  var ad = {author: {}, offer: {}, location: {}};
  ad.author.avatar = avatars.pop();
  ad.offer.title = 'Заголовок предложения';
  ad.offer.address = '600, 350';
  ad.offer.price = 0;
  ad.offer.type = getRandomArrayItem(TYPES);
  ad.offer.rooms = 0;
  ad.offer.guests = 0;
  ad.offer.checkin = getRandomArrayItem(TIMES_OF_CHECK_IN);
  ad.offer.checkout = getRandomArrayItem(TIMES_OF_CHECKOUT);
  ad.offer.features = getClippedArray(getMixedArray(FEATURES));
  ad.offer.description = '';
  ad.offer.photos = getClippedArray(getMixedArray(PHOTOS));
  ad.location.x = getRandomInteger(LOCATION_MIN_X, locationMaxX);
  ad.location.y = getRandomInteger(LOCATION_MIN_Y, LOCATION_MAX_Y);

  return ad;
};

var createArrayOfAds = function (number) {
  var ArrayOfAds = [];
  var arrayOfAvatars = getMixedArray(generateArrayOfAvatars(number));

  for (var i = 0; i < number; i++) {
    ArrayOfAds[i] = generateRandomAd(arrayOfAvatars);
  }

  return ArrayOfAds;
};

var renderAdPin = function (ad) {
  var pin = PinTemplate.cloneNode(true);

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

pinsBlock.appendChild(createPinsBlock(createArrayOfAds(NUMBER_OF_ADS)));
map.classList.remove('map--faded');
