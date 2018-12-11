'use strict';
(function () {
  var USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var USER_DESCR = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var MAX_PHOTOS = 25;
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;

  // Функция генерации комментариев пользователя
  function generateComments() {
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
  }

  // Функция генерации фотографий пользователей со случайными параметрами
  window.generateUserPhotos = function (arr) {
    var element;

    for (var i = 1; i <= MAX_PHOTOS; i++) {
      element = {
        user: 'photos/' + i + '.jpg',
        likes: window.utils.randomInteger(MIN_LIKES, MAX_LIKES),
        comments: generateComments(),
        description: USER_DESCR[window.utils.findRandomValue(USER_DESCR)]
      };
      arr.push(element);
    }
  };
})();
