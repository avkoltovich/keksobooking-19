'use strict';

(function () {
  var NUMBER_OF_ADS = 8;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var PRICES = [10000, 5000, 1000, 0];
  var GUESTS = [1, 2, 3];
  var ROOMS = [1, 2, 3, 100];
  var ROOM_WORDS = ['комнат', 'комната', 'комнаты'];
  var GUEST_WORDS = ['гостя', 'гостей'];
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var LOCATION_MIN_Y = 130;
  var LOCATION_MAX_Y = 630;
  var LOCATION_MIN_X = 25;
  var locationMaxX = document.querySelector('.map').offsetWidth - 25;

  window.mocks = {
    NUMBER_OF_ADS: NUMBER_OF_ADS,
    ROOM_WORDS: ROOM_WORDS,
    GUEST_WORDS: GUEST_WORDS,
    generateRandomAd: function (index) {
      var ad = {
        author: {},
        offer: {},
        location: {}
      };

      ad.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';

      ad.location.x = window.utils.getRandomInteger(LOCATION_MIN_X, locationMaxX);
      ad.location.y = window.utils.getRandomInteger(LOCATION_MIN_Y, LOCATION_MAX_Y);

      ad.offer.title = 'Здесь будет заголовок предложения';
      ad.offer.address = ad.location.x + ', ' + ad.location.y;
      ad.offer.price = window.utils.getRandomArrayItem(PRICES);
      ad.offer.type = window.utils.getRandomArrayItem(TYPES);
      ad.offer.rooms = window.utils.getRandomArrayItem(ROOMS);
      ad.offer.guests = window.utils.getRandomArrayItem(GUESTS);
      ad.offer.checkin = window.utils.getRandomArrayItem(CHECKIN_TIME);
      ad.offer.checkout = window.utils.getRandomArrayItem(CHECKOUT_TIME);
      ad.offer.features = window.utils.getClippedArray(FEATURES);
      ad.offer.description = 'Здесь будет описание';
      ad.offer.photos = window.utils.getClippedArray(window.utils.getMixedArray(PHOTOS));

      return ad;
    },
    createAds: function (number) {
      var ads = [];

      for (var i = 0; i < number; i++) {
        ads[i] = window.mocks.generateRandomAd(i);
      }

      return ads;
    }
  };
})();
