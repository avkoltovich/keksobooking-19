'use strict';

(function () {
  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  var MouseButton = {
    MAIN: 0
  };

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
    Key: Key,
    MouseButton: MouseButton,
    getCorrectWord: getCorrectWord
  };
})();
