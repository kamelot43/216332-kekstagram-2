'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');

  window.changeBigPicture = function (basePicture) {

    bigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', basePicture.user);
    bigPicture.querySelector('.likes-count').textContent = basePicture.likes;
    bigPicture.querySelector('.comments-count').textContent = basePicture.comments.length;
    bigPicture.querySelector('.social__caption').textContent = basePicture.description;
  };
})();
