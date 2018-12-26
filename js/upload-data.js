'use strict';
window.uploadData = (function () {
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadImages = document.querySelector('.pictures');
  // Форма редактирования изображения
  var uploadImgOverlay = uploadImages.querySelector('.img-upload__overlay');
  var sucessPopUp = document.querySelector('#success').content;
  var errorPopUp = document.querySelector('#error').content;
  var sucessBtn = sucessPopUp.querySelector('.success__button');
  var errorButtons = errorPopUp.querySelector('.error__buttons');

  var closeSuccessPopUp = function () {
    document.querySelector('.success').classList.add('hidden');
    document.removeEventListener('keydown', onSuccessPopupEscPress);
    window.validation.resetForm(uploadForm, true);
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

  return {
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
