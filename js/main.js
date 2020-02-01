'use strict';

var NUMBER_OF_ADS = 8;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var PRICES = [10000, 5000, 1000, 0];
var GUESTS = [1, 2, 3];
var ROOMS = [1, 2, 3, 100];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
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
  var ad = {author: {}, offer: {}, location: {}};

  ad.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';

  ad.location.x = getRandomInteger(LOCATION_MIN_X, locationMaxX);
  ad.location.y = getRandomInteger(LOCATION_MIN_Y, LOCATION_MAX_Y);

  ad.offer.title = 'Здесь будет заголовок предложения';
  ad.offer.address = ad.location.x + ', ' + ad.location.y;
  ad.offer.priceS = getRandomArrayItem(PRICES);
  ad.offer.type = getRandomArrayItem(TYPES);
  ad.offer.rooms = getRandomArrayItem(ROOMS);
  ad.offer.guests = getRandomArrayItem(GUESTS);
  ad.offer.checkin = getRandomArrayItem(CHECKIN_TIME);
  ad.offer.checkout = getRandomArrayItem(CHECKOUT_TIME);
  ad.offer.features = getClippedArray(getMixedArray(FEATURES));
  ad.offer.description = 'Здесь будет описание';
  ad.offer.photos = getClippedArray(getMixedArray(PHOTOS));

  return ad;
};

var createAds = function (number) {
  var Ads = [];

  for (var i = 0; i < number; i++) {
    Ads[i] = generateRandomAd(i);
  }

  return Ads;
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

pinsBlock.appendChild(createPinsBlock(createAds(NUMBER_OF_ADS)));
map.classList.remove('map--faded');
