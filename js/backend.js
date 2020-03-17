'use strict';

(function () {
  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  };

  var getServerResponse = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        switch (xhr.status) {
          case StatusCode.BAD_REQUEST:
            onError('Ошибка 400: Плохой запрос');
            break;
          case StatusCode.FORBIDDEN:
            onError('Ошибка 403: Запрещено');
            break;
          case StatusCode.NOT_FOUND:
            onError('Ошибка 404: Не найден');
            break;
          case StatusCode.INTERNAL_SERVER_ERROR:
            onError('Ошибка 500: Внутренняя ошибка сервера');
            break;
          case StatusCode.BAD_GATEWAY:
            onError('Ошибка 502: Плохой шлюз');
            break;
          case StatusCode.SERVICE_UNAVAILABLE:
            onError('Ошибка 503: Сервис недоступен');
            break;
          default:
            onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
  };

  var download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    getServerResponse(xhr, onSuccess, onError);
    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    getServerResponse(xhr, onSuccess, onError);
    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
