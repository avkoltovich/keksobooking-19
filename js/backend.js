'use strict';

(function () {
  var Url = {
    DOWNLOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };

  var Timeout = {
    IN_MS: 10000
  };

  var StatusCode = {
    OK: 200
  };

  var codeMap = {
    '400': 'Ошибка 400: Плохой запрос',
    '403': 'Ошибка 403: Запрещено',
    '404': 'Ошибка 404: Не найден',
    '500': 'Ошибка 500: Внутренняя ошибка сервера',
    '502': 'Ошибка 502: Плохой шлюз',
    '503': 'Ошибка 503: Сервис недоступен'
  };

  var getServerResponse = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else if (codeMap[xhr.status]) {
        onError(codeMap[xhr.status]);
      } else {
        onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = Timeout.IN_MS;
  };

  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    getServerResponse(xhr, onSuccess, onError);
    xhr.open('GET', Url.DOWNLOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    getServerResponse(xhr, onSuccess, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
