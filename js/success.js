'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var createSuccessPopup = function () {
    var successPopup = successTemplate.cloneNode(true);
    var successMessage = successPopup.querySelector('.success__message');

    successPopup.addEventListener('click', function (evt) {
      if (evt.target !== successMessage) {
        successPopup.remove();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Key.ESC) {
        successPopup.remove();
      }
    });

    return successPopup;
  };

  var showSuccessPopup = function (successText) {
    main.appendChild(createSuccessPopup(successText));
  };

  window.success = {
    show: showSuccessPopup
  };
})();
