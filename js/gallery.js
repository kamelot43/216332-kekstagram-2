'use strict';
(function () {
  // Контейнер для загрузки фотографии других пользователей
  var uploadImages = document.querySelector('.pictures');
  // Форма редактирования изображения
  var uploadImgOverlay = uploadImages.querySelector('.img-upload__overlay');
  // Слайдер, содержащий фото-фильтры
  var photoFiltersSlider = uploadImages.querySelector('.img-upload__effect-level');
  var bigPicture = document.querySelector('.big-picture');
  var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  // Поле загрузки фотографии
  var uploadFileInput = uploadImages.querySelector('.img-upload__input');
  var closePreviewElement = uploadImages.querySelector('.img-upload__cancel');


  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var onPreviewEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePreview);
  };


  var openPreview = function () {
    // Открыть оверлей
    // Утсановить значение фильтра по умолчанию (нет эффектов)
    // Скрыть слайдер
    uploadImgOverlay.classList.remove('hidden');
    document.getElementById('effect-none').checked = true;
    photoFiltersSlider.classList.add('hidden');
    document.addEventListener('keydown', onPreviewEscPress);
  };

  var openPopup = function () {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var closePreview = function () {
    uploadImgOverlay.classList.add('hidden');
    uploadFileInput.value = '';
    document.removeEventListener('keydown', onPreviewEscPress);
  };


  var change;

  closeBigPicture.addEventListener('click', function () {
    closePopup();
  });

  closeBigPicture.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  uploadFileInput.addEventListener('change', function () {
    openPreview();
  });


  closePreviewElement.addEventListener('click', function () {
    closePreview();
  });

  closePreviewElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePreview();
    }
  });

  // Пустой массив для хранения фотографий пользователей
  var photos = [];

  // window.picture.generateUserPhotos(photos);
  // window.picture.renderPhotos(photos);
  window.backend.load(window.picture.renderPhotos, window.backend.error);


  // Показ оверлея с текущей выбранной картинки при клике
  // Присутствует дублирование кода !!!
  uploadImages.addEventListener('click', function (evt) {
    var target = evt.target;
    var currentElement;

    if (target.parentNode.classList.contains('picture')) {
      openPopup();
      currentElement = window.utils.findCurrentIndex(window.photoCollection, target.parentNode);
      window.preview.pasteDataBigPicture(window.data[currentElement]);
    }
  });

  // Показ оверлея с текущей выбранной картинки при нажатии клавиши
  // Присутствует дублирование кода !!!
  uploadImages.addEventListener('keydown', function (evt) {
    var target = evt.target;
    var currentElement;


    if (evt.keyCode === window.ENTER_KEYCODE && target.classList.contains('picture')) {
      openPopup();
      currentElement = window.utils.findCurrentIndex(window.photoCollection, target.parentNode);
      console.log(currentElement);
      window.preview.pasteDataBigPicture(window.data[currentElement]);
    }
  });


})();
