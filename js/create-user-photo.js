'use strict';
(function () {
  // Функция создания DOM-элемента (фотография)
  // на основании существуещего шаблона и заполнение его данными.
  window.createUserPhoto = function (photo) {
    var similarPhotosTemplate = document.querySelector('#picture').content;
    var photoElement = similarPhotosTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').setAttribute('src', photo.user);
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture').setAttribute('tabindex', '0');

    return photoElement;
  };
})();
