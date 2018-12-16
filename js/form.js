'use strict';
(function () {

  // Валидация формы
  // Поле ввода хеш-тега
  var hashtagsInput = document.querySelector('.text__hashtags');
  // Поле ввода комментария
  var commentInput = document.querySelector('.text__description');
  // Контейнер для загрузки фотографии других пользователей
  var uploadImages = document.querySelector('.pictures');
  // Форма
  var uploadForm = document.querySelector('.img-upload__form');
  // Список фото-фильтров
  var uploadEffectsList = uploadImages.querySelector('.img-upload__effects');
  // Ползунок(пин)
  var pin = document.querySelector('.effect-level__pin');
  // Поле содержащее значение наложенного эффекта
  var effectLevelPin = document.querySelector('.effect-level__value');
  // Индикатор насышенности эффекта
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  // Очистка формы после отправки
  function resetForm(form) {
    form.submit();
    setTimeout(function () {
      form.reset();
      window.filter.restartFilter();
    }, 100);
  }

  // Валидация формы

  hashtagsInput.addEventListener('input', function () {
    console.log('hello');
    window.validation.validateHashTags(hashtagsInput);
  });

  commentInput.addEventListener('input', function () {
    window.validation.alidateComment(commentInput);
  });

  uploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    resetForm(uploadForm);
  });

  // Фильтрация

  uploadEffectsList.addEventListener('change', function (evt) {
    var targetValue = evt.target.value;
    window.filter.changePhotoFilter(targetValue);
  });

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();


    var startCoords = {
      x: evt.clientX,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var deviation;
      var percent;

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      deviation = pin.offsetLeft - shift.x;
      // Расчет (%) нахождения текущего подложения пина относительно шкалы изменения насыщенности
      percent = Math.ceil((deviation * 100) / window.MAX_CLIENT_X);


      if (deviation >= window.MIN_CLIENT_X && deviation <= window.MAX_CLIENT_X) {
        pin.style.left = deviation + 'px';
        effectLevelPin.setAttribute('value', percent);
        // Изменение шкалы насышенности цвета. Принимает процентное соотношение percent
        effectLevelDepth.style.width = percent + '%';
        window.filter.filtration(percent);
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();