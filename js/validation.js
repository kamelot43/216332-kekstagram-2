'use strict';
window.validation = (function () {

  var MAX_HASH_TAGS = 5;
  var MAX_HASH_TAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;

  return {

    // Функция поиска одинаковых хеш-тегов
    findSameHashTags: function (array, item) {
      var indices = [];
      // Текущий индекс элемента в массиве
      var idx = array.indexOf(item);
      while (idx !== -1) {
        indices.push(idx);
        idx = array.indexOf(item, idx + 1);
      }

      if (indices.length > 1) {
        return true;
      }
      return false;
    },

    // Функция валидации поля формы хеш-тег
    validateHashTags: function (input) {
      var hashtagsArrays = input.value.toLowerCase().split(' ');
      var currentElement;
      for (var i = 0; i < hashtagsArrays.length; i++) {
        currentElement = hashtagsArrays[i];
        if (hashtagsArrays.indexOf('') !== -1) {
          input.setCustomValidity('хэш-теги разделяются пробелами');
        } else if (currentElement.charAt(0) !== '#') {
          input.setCustomValidity('хештег должен начинаться с символа #');
        } else if (currentElement.length <= 1) {
          input.setCustomValidity('хештег не должен состоять только из символа #');
        } else if (window.validation.findSameHashTags(hashtagsArrays, currentElement)) {
          input.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
        } else if (hashtagsArrays.length > MAX_HASH_TAGS) {
          input.setCustomValidity('нельзя указать больше пяти хэш-тегов');
        } else if (currentElement.length > MAX_HASH_TAG_LENGTH) {
          input.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
        } else {
          input.setCustomValidity('');
        }
      }
    },

    // Функция валидации поля формы коммантарий
    validateComment: function (input) {
      if (input.value.length > MAX_COMMENT_LENGTH) {
        input.setCustomValidity('длина комментария не может составлять больше 140 символов');
      } else {
        input.setCustomValidity('');
      }
    },

    // Очистка формы после отправки
    resetForm: function (form, flag) {
      if (flag) {
        form.submit();
      }
      setTimeout(function () {
        form.reset();
        window.filter.restartFilter();
      }, 100);
    }
  };
})();
