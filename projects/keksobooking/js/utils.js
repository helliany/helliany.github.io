'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  // возвращает верное окончание слова
  var getWordDecl = function (number, arr) {
    var count = number > 19 ? number % 10 : number % 100;
    switch (count) {
      case 1:
        return arr[0];
      case 2: case 3: case 4:
        return arr[1];
      default:
        return arr[2];
    }
  };

  // устранение дребезга
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.utils = {
    getWordDecl: getWordDecl,
    debounce: debounce
  };
})();
