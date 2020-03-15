'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MAIN_MOUSE_BUTTON = 0;

  var getCorrectWord = function (number, words) {
    if (words.length === 2) {
      return (number % 10 === 1 && number % 100 !== 11) ? words[0] : words[1];
    }
    if ((number >= 5 && number <= 19) || (number % 10 >= 5 && number % 10 <= 9) || number % 10 === 0) {
      return words[0];
    }
    return (number % 10 === 1) ? words[1] : words[2];
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    MAIN_MOUSE_BUTTON: MAIN_MOUSE_BUTTON,
    getCorrectWord: getCorrectWord
  };
})();
