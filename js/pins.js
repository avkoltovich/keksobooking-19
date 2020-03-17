'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsWrapper = map.querySelector('.map__pins');
  var filtersContainer = map.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderAdPin = function (ad) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = (ad.location.x - 25) + 'px';
    pin.style.top = (ad.location.y - 70) + 'px';
    pin.querySelector('img').src = ad.author.avatar;
    pin.querySelector('img').alt = ad.offer.title;

    var renderAdCard = function () {
      window.card.remove();
      map.insertBefore(window.card.create(ad), filtersContainer);
    };

    pin.addEventListener('click', function () {
      renderAdCard();
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

  var showPinsBlock = function (ads, maxNumber) {
    mapPinsWrapper.appendChild(createPinsBlock(ads, maxNumber));
  };

  var removePinsBlock = function () {
    var pinsBlock = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsBlock.length; i++) {
      pinsBlock[i].remove();
    }
  };

  window.pins = {
    show: showPinsBlock,
    remove: removePinsBlock
  };
})();
