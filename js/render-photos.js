'use strict';
(function () {
  var photosListElement = document.querySelector('.pictures');

  window.renderPhotos = function (arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      fragment.appendChild(window.createUserPhoto(arr[i]));
    }
    photosListElement.appendChild(fragment);
    // Коллекция Dom-элементов фотграфии пользователей
    window.photoCollection = document.querySelectorAll('.picture');
  };
})();
