'use strict';
window.utils = (function () {
  window.ESC_KEYCODE = 27;
  window.ENTER_KEYCODE = 13;
  // Поле ввода хеш-тега
  var hashtagsInput = document.querySelector('.text__hashtags');
  // Поле ввода комментария
  var commentInput = document.querySelector('.text__description');

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE && hashtagsInput !== document.activeElement && commentInput !== document.activeElement) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    randomInteger: function (min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      rand = Math.round(rand);
      return rand;
    },
    findRandomValue: function (arr) {
      return Math.floor(Math.random() * arr.length);
    },
    findCurrentIndex: function (collection, target) {
      var index = Array.prototype.slice.call(collection).indexOf(target);
      return index;
    }
  };
})();
