'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000;
  var RESPONSE_TYPE = 'json';

  var RequestMethod = {
    DOWNLOAD: 'GET',
    UPLOAD: 'POST'
  };

  var Url = {
    DOWNLOAD: 'https://javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://javascript.pages.academy/keksobooking'
  };

  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  };

  var errorMap = {
    '400': 'Ошибка 400: Плохой запрос',
    '403': 'Ошибка 403: Запрещено',
    '404': 'Ошибка 404: Не найден',
    '500': 'Ошибка 500: Внутренняя ошибка сервера',
    '502': 'Ошибка 502: Плохой шлюз',
    '503': 'Ошибка 503: Сервис недоступен'
  };

  var getServerResponse = function (xhr, onSuccess, onError) {
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        switch (xhr.status) {
          case StatusCode.BAD_REQUEST:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.FORBIDDEN:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.NOT_FOUND:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.INTERNAL_SERVER_ERROR:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.BAD_GATEWAY:
            onError(errorMap[xhr.status]);
            break;
          case StatusCode.SERVICE_UNAVAILABLE:
            onError(errorMap[xhr.status]);
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
    xhr.open(RequestMethod.DOWNLOAD, Url.DOWNLOAD);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    getServerResponse(xhr, onSuccess, onError);
    xhr.open(RequestMethod.UPLOAD, Url.UPLOAD);
    xhr.send(data);
  };

  window.backend = {
    download: download,
    upload: upload
  };
})();
