'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var CODE_SUCCESS = 200;
  var TIMEOUT = 10000;

  var request = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var loadURL = URL + '/data';
    var xhr = request(onLoad, onError);

    xhr.open('GET', loadURL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = request(onLoad, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
