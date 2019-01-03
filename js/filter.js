'use strict';
window.filter = (function () {

  // Ползунок(пин)
  var pin = document.querySelector('.effect-level__pin');
  // Контейнер для загрузки фотографии других пользователей
  var uploadImages = document.querySelector('.pictures');
  // Предварительный просмотр изображения
  var uploadImgPreview = uploadImages.querySelector('.img-upload__preview');
  // Слайдер, содержащий фото-фильтры
  var photoFiltersSlider = uploadImages.querySelector('.img-upload__effect-level');
  // Индикатор насышенности эффекта
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  // Значение масштаба фотографии
  var scaleValue = uploadImages.querySelector('.scale__control--value');
  var SCALE_BASE = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;

  // Мин. координата пина относительно левого края
  window.MIN_CLIENT_X = 0;
  // Макс. координата пина относительно правого края
  window.MAX_CLIENT_X = 445;
  // Макс. значение глубины цвета
  var MAX_DEPTH_VAL = 100;
  var DEFAULT_PHOTO_FILTER = 'img-upload__preview';


  return {

    // Функция сброса значение при переключении фильтрами
    // Сбрасывает ранее примененные фильтры
    // Устанавливает значение пина и шкалы насышенности в значение по-умолчанию
    restartFilter: function () {
      uploadImgPreview.style.filter = '';
      uploadImgPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
      pin.style.left = window.MAX_CLIENT_X + 'px';
      effectLevelDepth.style.width = MAX_DEPTH_VAL + '%';
    },

    // Функция наложения фото-эффекта на фотографию
    changePhotoFilter: function (currentFilter) {
      window.filter.restartFilter();

      if (currentFilter !== 'none') {
        photoFiltersSlider.classList.remove('hidden');
        uploadImgPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
        uploadImgPreview.classList.add('effects__preview--' + currentFilter);
      } else {
        uploadImgPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
        photoFiltersSlider.classList.add('hidden');
      }
    },

    // Работа с перемещением пина и изменение наложенных на фотографию эффектов
    filtration: function (filterValue) {
      // пропорция для расчета уровня фильтра
      var proportion = (3 * filterValue) / 100;

      if (uploadImgPreview.classList.contains('effects__preview--chrome')) {
        uploadImgPreview.style.filter = 'grayscale(' + filterValue + '% )';
      } else if (uploadImgPreview.classList.contains('effects__preview--sepia')) {
        uploadImgPreview.style.filter = 'sepia(' + filterValue + '% )';
      } else if (uploadImgPreview.classList.contains('effects__preview--marvin')) {
        uploadImgPreview.style.filter = 'invert(' + filterValue + '%)';
      } else if (uploadImgPreview.classList.contains('effects__preview--phobos')) {
        uploadImgPreview.style.filter = 'blur(' + proportion + 'px)';
      } else if (uploadImgPreview.classList.contains('effects__preview--heat')) {
        uploadImgPreview.style.filter = 'brightness(' + proportion + ')';
      } else {
        return;
      }
    },

    // Функции увеличения/уменьшения масштаба фотографии
    scalePlus: function () {
      var base;
      if (+scaleValue.value.slice(0, -1) < SCALE_BASE) {
        base = +scaleValue.value.slice(0, -1) + SCALE_STEP;
        scaleValue.value = base + '%';
      }
      return scaleValue.value;
    },

    scaleMinus: function () {
      var base;
      if (+scaleValue.value.slice(0, -1) > SCALE_MIN) {
        base = +scaleValue.value.slice(0, -1) - SCALE_STEP;
        scaleValue.value = base + '%';
      }
      return scaleValue.value;
    }

  };
})();
