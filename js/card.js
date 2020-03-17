'use strict';

(function () {
  var ROOM_WORDS = ['комнат', 'комната', 'комнаты'];
  var GUEST_WORDS = ['гостя', 'гостей'];
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createCard = function (ad) {
    var card = cardTemplate.cloneNode(true);
    var cardCloseButton = card.querySelector('.popup__close');
    var popupFeatures = card.querySelector('.popup__features');
    var popupFeature = card.querySelectorAll('.popup__feature');
    var popupPhotos = card.querySelector('.popup__photos');
    var popupPhoto = popupPhotos.querySelector('.popup__photo');

    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

    var roomType = '';

    switch (ad.offer.type) {
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

    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' +
      window.utils.getCorrectWord(ad.offer.rooms, ROOM_WORDS) + ' для ' + ad.offer.guests + ' ' +
      window.utils.getCorrectWord(ad.offer.guests, GUEST_WORDS);
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    for (var i = popupFeature.length - 1; i >= ad.offer.features.length; i--) {
      popupFeatures.removeChild(popupFeature[i]);
    }

    card.querySelector('.popup__description').textContent = ad.offer.description;

    popupPhotos.removeChild(popupPhoto);

    if (ad.offer.photos.length > 0) {
      for (i = 0; i < ad.offer.photos.length; i++) {
        var newPopupPhoto = popupPhoto.cloneNode(false);
        popupPhotos.appendChild(newPopupPhoto);
        newPopupPhoto.src = ad.offer.photos[i];
      }
    }

    card.querySelector('.popup__avatar').src = ad.author.avatar;

    cardCloseButton.addEventListener('click', function () {
      card.remove();
    });
    cardCloseButton.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ENTER_KEY) {
        card.remove();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.ESC_KEY) {
        card.remove();
      }
    });

    return card;
  };

  var removePopupCard = function () {
    var popupCard = document.querySelector('.map__card.popup');
    if (popupCard) {
      popupCard.remove();
    }
  };

  window.card = {
    create: createCard,
    remove: removePopupCard
  };
})();
