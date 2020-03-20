'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var createErrorPopup = function (errorText) {
    var errorPopup = errorTemplate.cloneNode(true);
    var errorMessage = errorPopup.querySelector('.error__message');
    var errorButton = errorPopup.querySelector('.error__button');

    errorMessage.textContent = errorText;

    errorButton.addEventListener('click', function () {
      errorPopup.remove();
    });
    errorPopup.addEventListener('click', function (evt) {
      if (evt.target !== errorMessage) {
        errorPopup.remove();
      }
    });
    errorButton.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Key.ENTER) {
        errorPopup.remove();
      }
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Key.ESC) {
        errorPopup.remove();
      }
    });

    return errorPopup;
  };

  var showErrorPopup = function (errorText) {
    var mainPopup = main.querySelector('.error');
    if (!mainPopup) {
      main.appendChild(createErrorPopup(errorText));
    }
  };

  window.error = {
    show: showErrorPopup
  };
})();
