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
      document.removeEventListener('keydown', onEscKeydown);
    });
    errorPopup.addEventListener('click', function (evt) {
      if (evt.target !== errorMessage) {
        errorPopup.remove();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });
    errorButton.addEventListener('keydown', function (evt) {
      if (evt.key === window.utils.Key.ENTER) {
        errorPopup.remove();
        document.removeEventListener('keydown', onEscKeydown);
      }
    });

    var onEscKeydown = function (evt) {
      if (evt.key === window.utils.Key.ESC) {
        errorPopup.remove();
        document.removeEventListener('keydown', onEscKeydown);
      }
    };

    document.addEventListener('keydown', onEscKeydown);

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
