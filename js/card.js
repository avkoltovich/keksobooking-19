'use strict';

(function () {
  var Word = {
    ROOMS: ['комнат', 'комната', 'комнаты'],
    GUESTS: ['гостя', 'гостей']
  };

  var roomTypeMap = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

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

    var roomType = roomTypeMap[ad.offer.type];

    card.querySelector('.popup__type').textContent = roomType;

    card.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' +
      window.utils.getCorrectWord(ad.offer.rooms, Word.ROOMS) + ' для ' + ad.offer.guests + ' ' +
      window.utils.getCorrectWord(ad.offer.guests, Word.GUESTS);
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
      if (evt.key === window.utils.Key.ENTER) {
        card.remove();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Key.ESC) {
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
