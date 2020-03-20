'use strict';

(function () {
  var Pin = {
    MAX_NUMBER: 5,
    X_OFFSET: 25,
    Y_OFFSET: 70
  };

  var map = document.querySelector('.map');
  var mapPinsWrapper = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderAdPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = (ad.location.x - Pin.X_OFFSET) + 'px';
    pin.style.top = (ad.location.y - Pin.Y_OFFSET) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;

    var renderAdCard = function () {
      window.card.remove();
      map.insertBefore(window.card.create(ad), filtersContainer);
    };

    pin.addEventListener('click', function () {
      renderAdCard();
      pin.classList.add('map__pin--active');
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Key.ENTER) {
        renderAdCard();
      }
    });

    return pin;
  };

  var createPinsBlock = function (ads, maxNumber) {
    var fragment = document.createDocumentFragment();

    var number = ads.length >= maxNumber ? maxNumber : ads.length;

    for (var i = 0; i < number; i++) {
      fragment.appendChild(renderAdPin(ads[i]));
    }

    return fragment;
  };

  var showPinsBlock = function (ads) {
    mapPinsWrapper.appendChild(createPinsBlock(ads, Pin.MAX_NUMBER));
  };

  var removePinsBlock = function () {
    var pinsBlock = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsBlock.forEach(function (item) {
      item.remove();
    });
  };

  window.pins = {
    show: showPinsBlock,
    remove: removePinsBlock
  };
})();
