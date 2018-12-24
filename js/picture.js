'use strict';
window.picture = (function () {

  var USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var USER_DESCR = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var MAX_PHOTOS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  var photosListElement = document.querySelector('.pictures');


  return {

    // Функция создания DOM-элемента (фотография)
    // на основании существуещего шаблона и заполнение его данными.
    createUserPhoto: function (photo) {
      var similarPhotosTemplate = document.querySelector('#picture').content;
      var photoElement = similarPhotosTemplate.cloneNode(true);

      photoElement.querySelector('.picture__img').setAttribute('src', photo.url);
      photoElement.querySelector('.picture__likes').textContent = photo.likes;
      photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
      photoElement.querySelector('.picture').setAttribute('tabindex', '0');

      return photoElement;
    },

    // Функция генерации комментариев пользователя
    generateComments: function () {
      var number = window.utils.randomInteger(1, 2);
      var commentsArray = [];
      var comment;

      for (var x = 1; x <= number; x++) {
        comment = USER_COMMENTS[window.utils.findRandomValue(USER_COMMENTS)];
        if (commentsArray.indexOf(comment) === -1) {
          commentsArray.push(comment);
        }
      }
      return commentsArray;
    },

    // Функция генерации фотографий пользователей со случайными параметрами
    generateUserPhotos: function (arr) {
      var element;

      for (var i = 1; i <= MAX_PHOTOS; i++) {
        element = {
          user: 'photos/' + i + '.jpg',
          likes: window.utils.randomInteger(MIN_LIKES, MAX_LIKES),
          comments: window.picture.generateComments(),
          description: USER_DESCR[window.utils.findRandomValue(USER_DESCR)]
        };
        arr.push(element);
      }
    },

    renderPhotos: function (arr) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < MAX_PHOTOS; i++) {
        fragment.appendChild(window.picture.createUserPhoto(arr[i]));
      }
      photosListElement.appendChild(fragment);
      // Коллекция Dom-элементов фотграфии пользователей
      window.photoCollection = document.querySelectorAll('.picture');
    }
  };
})();
