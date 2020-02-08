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
var filtersContainer = map.querySelector('.map__filters-container');
var pinsBlock = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
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

var getCorrectWordForRoom = function (number) {
  if ((number >= 5 && number <= 19) || (number % 10 >= 5 && number % 10 <= 9) || number % 10 === 0) {
    return number + ' комнат';
  }

  return (number % 10 === 1) ? number + ' комната' : number + ' комнаты';
};

var getCorrectWordForGuest = function (number) {
  return (number % 10 === 1 && number % 100 !== 11) ? number + ' гостя' : number + ' гостей';
};

var createCard = function (arrayItem) {
  var card = cardTemplate.cloneNode(true);
  var popupFeatures = card.querySelector('.popup__features');
  var popupFeature = card.querySelectorAll('.popup__feature');
  var popupPhotos = card.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');

  card.querySelector('.popup__title').textContent = arrayItem.offer.title;
  card.querySelector('.popup__text--address').textContent = arrayItem.offer.address;
  card.querySelector('.popup__text--price').textContent = arrayItem.offer.price + '₽/ночь';

  var roomType = '';

  switch (arrayItem.offer.type) {
    case 'flat':
      roomType = 'Квартира';
      break;
    case 'bungalo':
      roomType = 'Бунгало';
      break;
    case 'house':
      roomType = 'Дом';
      break;
    case 'palace':
      roomType = 'Дворец';
      break;
  }

  card.querySelector('.popup__type').textContent = roomType;

  card.querySelector('.popup__text--capacity').textContent = getCorrectWordForRoom(arrayItem.offer.rooms) + ' для ' + getCorrectWordForGuest(arrayItem.offer.guests);
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayItem.offer.checkin + ', выезд до ' + arrayItem.offer.checkout;

  for (var i = popupFeature.length - 1; i >= arrayItem.offer.features.length; i--) {
    popupFeatures.removeChild(popupFeature[i]);
  }

  card.querySelector('.popup__description').textContent = arrayItem.offer.description;
  popupPhoto.setAttribute('src', arrayItem.offer.photos[0]);

  if (arrayItem.offer.photos.length > 1) {
    for (i = 1; i < arrayItem.offer.photos.length; i++) {
      var newPopupPhoto = popupPhoto.cloneNode(false);
      popupPhotos.appendChild(newPopupPhoto);
      newPopupPhoto.setAttribute('src', arrayItem.offer.photos[i]);
    }
  }

  card.querySelector('.popup__avatar').setAttribute('src', arrayItem.author.avatar);

  return card;
};

var randomAds = createAds(NUMBER_OF_ADS);

pinsBlock.appendChild(createPinsBlock(randomAds));
map.insertBefore(createCard(randomAds[0]), filtersContainer);
map.classList.remove('map--faded');
