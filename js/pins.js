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
      var popupCard = document.querySelector('.map__card.popup');
      if (popupCard) {
        popupCard.remove();
      }
      map.insertBefore(window.cards.createCard(ad), filtersContainer);
    };

    pin.addEventListener('click', function () {
      renderAdCard();
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ENTER_KEY) {
        renderAdCard();
      }
    });

    return pin;
  };

  window.pins = {
    createPinsBlock: function (ads) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        fragment.appendChild(renderAdPin(ads[i]));
      }

      return fragment;
    },
    showPinsBlock: function (ads) {
      mapPinsWrapper.appendChild(window.pins.createPinsBlock(ads));
    }
  };
})();
