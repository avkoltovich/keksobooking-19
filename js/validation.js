'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adPrice = adForm.querySelector('#price');
  var adType = adForm.querySelector('#type');
  var adCheckin = adForm.querySelector('#timein');
  var adCheckout = adForm.querySelector('#timeout');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adGuestNumber = adForm.querySelector('#capacity');

  var adPriceMap = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

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
      case '1':
        if (adGuestNumber.value !== '1') {
          adGuestNumber.setCustomValidity('«для 1 гостя»');
        }
        break;
      case '2':
        if (adGuestNumber.value === '0' ||
          adGuestNumber.value === '3') {
          adGuestNumber.setCustomValidity('«для 2 гостей» или «для 1 гостя»');
        }
        break;
      case '3':
        if (adGuestNumber.value === '0') {
          adGuestNumber.setCustomValidity('«для 3 гостей», «для 2 гостей» или «для 1 гостя»');
        }
        break;
      case '100':
        if (adGuestNumber.value !== '0') {
          adGuestNumber.setCustomValidity('«не для гостей»');
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

  onTypeChange();

  adRoomNumber.addEventListener('change', onRoomOrGuestChange);
  adGuestNumber.addEventListener('change', onRoomOrGuestChange);
  adCheckin.addEventListener('change', onCheckinChange);
  adCheckout.addEventListener('change', onCheckoutChange);
  adType.addEventListener('change', onTypeChange);
})();
