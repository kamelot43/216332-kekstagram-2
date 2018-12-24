'use strict';
window.preview = (function () {

  var socialComments = document.querySelector('.social__comments');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var socialComment = document.querySelector('.social__comment');
  var bigPicture = document.querySelector('.big-picture');

  return {

    // Функция создания DOM-элемента комментарий к bigPhoto
    createCommentElement: function (comment) {

      var currentComment = socialComment.cloneNode(true);

      currentComment.querySelector('.social__picture').setAttribute('src', comment.avatar);
      currentComment.querySelector('.social__text').textContent = comment.message;
      console.log(comment);

      return currentComment;
    },

    changeBigPicture: function (basePicture) {
      bigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', basePicture.url);
      bigPicture.querySelector('.likes-count').textContent = basePicture.likes;
      bigPicture.querySelector('.comments-count').textContent = basePicture.comments.length;
      bigPicture.querySelector('.social__caption').textContent = basePicture.description;
    },

    pasteDataBigPicture: function (baseElement) {
      window.preview.changeBigPicture(baseElement);

      socialCommentCount.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');
      var fragment = document.createDocumentFragment();


      for (var i = 0; i < baseElement.comments.length; i++) {
        var commentElement = window.preview.createCommentElement(baseElement.comments[i]);
        fragment.appendChild(commentElement);
      }

      socialComments.innerHTML = '';
      socialComments.appendChild(fragment);
    }
  };
})();
