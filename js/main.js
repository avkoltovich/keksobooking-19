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

var getMixedArray = function (array) {
  var mixedArray = [];
  var arrayForLog = [];
  var swap;

  for (var i = 0; i < array.length; i++) {
    do {
      swap = getRandomInteger(0, array.length - 1);
    } while (arrayForLog.indexOf(swap) !== -1);
    arrayForLog.push(swap);
    mixedArray.push(array[swap]);
  }

  return mixedArray;
};

var getClippedArray = function (array) {
  var clippedArray = [];

  for (var i = 0; i < getRandomInteger(0, array.length - 1); i++) {
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

var generateRandomAd = function (avatars, types, timesOfCheckIn, timesOfCheckout, features, photos, minX, maxX, minY, maxY) {
  var ad = {author: {}, offer: {}, location: {}};
  ad.author.avatar = avatars.pop();
  ad.offer.title = 'Заголовок предложения';
  ad.offer.address = '600, 350';
  ad.offer.price = 0;
  ad.offer.type = types[getRandomInteger(0, types.length - 1)];
  ad.offer.rooms = 0;
  ad.offer.guests = 0;
  ad.offer.checkin = timesOfCheckIn[getRandomInteger(0, timesOfCheckIn.length - 1)];
  ad.offer.checkout = timesOfCheckout[getRandomInteger(0, timesOfCheckout.length - 1)];
  ad.offer.features = getClippedArray(getMixedArray(features));
  ad.offer.description = '';
  ad.offer.photos = getClippedArray(getMixedArray(photos));
  ad.location.x = getRandomInteger(minX, maxX);
  ad.location.y = getRandomInteger(minY, maxY);

  return ad;
};

var createArrayOfAds = function (number, types, timesOfCheckIn, timesOfCheckout, features, photos, minX, maxX, minY, maxY) {
  var ArrayOfAds = [];
  var arrayOfAvatars = getMixedArray(generateArrayOfAvatars(number));

  for (var i = 0; i < number; i++) {
    ArrayOfAds[i] = generateRandomAd(arrayOfAvatars, types, timesOfCheckIn, timesOfCheckout, features, photos, minX, maxX, minY, maxY);
  }

  return ArrayOfAds;
};

var createAdPin = function (ad) {
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
    pinsBlock.appendChild(createAdPin(ads[i]));
  }

  pinsBlock.appendChild(fragment);
};

createPinsBlock(createArrayOfAds(NUMBER_OF_ADS, TYPES, TIMES_OF_CHECK_IN, TIMES_OF_CHECKOUT, FEATURES, PHOTOS, LOCATION_MIN_X, locationMaxX, LOCATION_MIN_Y, LOCATION_MAX_Y));
map.classList.remove('map--faded');
