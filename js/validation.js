'use strict';

(function () {
  var AdRoomNumber = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    ONE_HUNDRED: '100'
  };

  var AdGuestNumber = {
    ZERO: '0',
    ONE: '1',
    THREE: '3'
  };

  var adPriceMap = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var adGuestNumberMap = {
    '1': '«для 1 гостя»',
    '2': '«для 2 гостей» или «для 1 гостя»',
    '3': '«для 3 гостей», «для 2 гостей» или «для 1 гостя»',
    '100': '«не для гостей»'
  };

  var adForm = document.querySelector('.ad-form');
  var adPrice = adForm.querySelector('#price');
  var adType = adForm.querySelector('#type');
  var adCheckin = adForm.querySelector('#timein');
  var adCheckout = adForm.querySelector('#timeout');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adGuestNumber = adForm.querySelector('#capacity');

  var onTypeChange = function () {
    adPrice.min = adPriceMap[adType.value];
    adPrice.placeholder = adPriceMap[adType.value];
  };

  var checkinAndCheckoutSync = function (select, selectToSync) {
    selectToSync.value = select.value;
  };

  var onRoomOrGuestChange = function () {
    adGuestNumber.setCustomValidity('');
    switch (adRoomNumber.value) {
      case AdRoomNumber.ONE:
        if (adGuestNumber.value !== AdGuestNumber.ONE) {
          adGuestNumber.setCustomValidity(adGuestNumberMap[adRoomNumber.value]);
        }
        break;
      case AdRoomNumber.TWO:
        if (adGuestNumber.value === AdGuestNumber.ZERO ||
          adGuestNumber.value === AdGuestNumber.THREE) {
          adGuestNumber.setCustomValidity(adGuestNumberMap[adRoomNumber.value]);
        }
        break;
      case AdRoomNumber.THREE:
        if (adGuestNumber.value === AdGuestNumber.ZERO) {
          adGuestNumber.setCustomValidity(adGuestNumberMap[adRoomNumber.value]);
        }
        break;
      case AdRoomNumber.ONE_HUNDRED:
        if (adGuestNumber.value !== AdGuestNumber.ZERO) {
          adGuestNumber.setCustomValidity(adGuestNumberMap[adRoomNumber.value]);
        }
        break;
    }
  };

  var onCheckinChange = function () {
    checkinAndCheckoutSync(adCheckin, adCheckout);
  };

  var onCheckoutChange = function () {
    checkinAndCheckoutSync(adCheckout, adCheckin);
  };

  adRoomNumber.addEventListener('change', onRoomOrGuestChange);
  adGuestNumber.addEventListener('change', onRoomOrGuestChange);
  adCheckin.addEventListener('change', onCheckinChange);
  adCheckout.addEventListener('change', onCheckoutChange);
  adType.addEventListener('change', onTypeChange);

  window.validation = {
    checkRoomAndGuest: onRoomOrGuestChange,
    checkType: onTypeChange
  };
})();
