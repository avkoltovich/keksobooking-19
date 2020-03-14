'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var MAIN_MOUSE_BUTTON = 0;

  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var getRandomArrayItem = function (array) {
    return array[window.utils.getRandomInteger(0, array.length - 1)];
  };

  var getMixedArray = function (array) {
    var mixedArray = array.slice();
    var j;
    var swap;

    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      swap = mixedArray[i];
      mixedArray[i] = mixedArray[j];
      mixedArray[j] = swap;
    }

    return mixedArray;
  };

  var getClippedArray = function (array) {
    return array.slice(0, window.utils.getRandomInteger(1, array.length));
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
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    MAIN_MOUSE_BUTTON: MAIN_MOUSE_BUTTON,
    getRandomInteger: getRandomInteger,
    getRandomArrayItem: getRandomArrayItem,
    getMixedArray: getMixedArray,
    getClippedArray: getClippedArray,
    getCorrectWord: getCorrectWord
  };
})();
