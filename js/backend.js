'use strict';
window.backend = (function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var sucessPopUp = document.querySelector('#success').content;
  var errorPopUp = document.querySelector('#error').content;
  var sucessBtn = sucessPopUp.querySelector('.success__button');
  var errorButtons = errorPopUp.querySelector('.error__buttons');

  var closeSuccessPopUp = function () {
    document.querySelector('.success').style.display = 'none';
    document.removeEventListener('keydown', onSuccessPopupEscPress);
    resetForm(uploadForm);
  };

  var closeErrorPopUp = function () {
    document.querySelector('.error').style.display = 'none';
    document.removeEventListener('keydown', onErrorPopupEscPress);
  };

  var openSuccessPopUp = function () {
    document.querySelector('main').appendChild(sucessPopUp);
    uploadImgOverlay.classList.add('hidden');
    document.addEventListener('keydown', onSuccessPopupEscPress);
  };

  var openErrorPopUp = function (errorMessage) {
    document.querySelector('main').appendChild(errorPopUp);
    document.querySelector('.error__title').textContent = errorMessage;
    document.addEventListener('keydown', onErrorPopupEscPress);
  };

  var onSuccessPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeSuccessPopUp);
  };

  var onErrorPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeErrorPopUp);
  };

  var successAction = function () {
    openSuccessPopUp();

    sucessBtn.addEventListener('click', closeSuccessPopUp);

    sucessBtn.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, closeSuccessPopUp);
    });
  };

  var errorAction = function (error) {
    openErrorPopUp(error);

    errorButtons.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('error__button')) {
        closeErrorPopUp();
      }
    });

    errorButtons.addEventListener('keydown', function (evt) {
      if (evt.target.classList.contains('error__button')) {
        window.utils.isEnterEvent(evt, closeErrorPopUp);
      }
    });
  };


  var sendRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          window.data = xhr.response;
          onSuccess(xhr.response);
          break;
        case 400:
          onError(xhr.status + xhr.statusText + 'Неверный запрос');
          break;
        case 404:
          onError(xhr.status + xhr.statusText + 'Ничего не найдено');
          break;
        case 401:
          onError(xhr.status + xhr.statusText + 'Пользователь не авторизован');
          break;
        case 500:
          onError(xhr.status + xhr.statusText + 'Ошибка сервера');
          break;
        default:
          onError('Неизвестный статус' + xhr.status + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 2000; // 10s
    return xhr;
  };

  return {
    load: function (onSuccess, onError) {
      var xhr = sendRequest(onSuccess, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var xhr = sendRequest(onSuccess, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    },

    successAction: function (errorMessage) {
      openSuccessPopUp();

      sucessBtn.addEventListener('click', closeSuccessPopUp);

      sucessBtn.addEventListener('keydown', function (evt) {
        window.utils.isEnterEvent(evt, closeSuccessPopUp);
      });
    },

    errorAction: function (errorMessage) {
      openErrorPopUp(errorMessage);

      errorButtons.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('error__button')) {
          closeErrorPopUp();
        }
      });

      errorButtons.addEventListener('keydown', function (evt) {
        if (evt.target.classList.contains('error__button')) {
          window.utils.isEnterEvent(evt, closeErrorPopUp);
        }
      });
    }
  };
})();
