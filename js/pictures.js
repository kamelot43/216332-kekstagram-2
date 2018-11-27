var USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USER_DESCR = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var MAX_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

var similarPhotosTemplate = document.querySelector('#picture').content;
var photosListElement = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var socialComments = document.querySelector('.social__comments');
var socialComment = document.querySelector('.social__comment');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

// Пустой массив для хранения фотографий пользователей
var photos = [];

// Функция нахождения случайного значения из диапазона чисел
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

// Функция нахождения случайного значения из массива
function findRandomValue(arr) {
  return Math.floor(Math.random() * arr.length);
}

// Функция генерации комментариев пользователя
function generateComments() {
  var number = randomInteger(1, 2);
  var commentsArray = [];
  var comment;

  for (var x = 1; x <= number; x++) {
    comment = USER_COMMENTS[findRandomValue(USER_COMMENTS)];
    if (commentsArray.indexOf(comment) === -1) {
      commentsArray.push(comment);
    }
  }
  return commentsArray;
}

// Функция генерации фотографий пользователей со случайными параметрами
function generateUserPhotos(arr) {
  var element;

  for (var i = 1; i <= MAX_PHOTOS; i++) {
    element = {
      user: 'photos/' + i + '.jpg',
      likes: randomInteger(MIN_LIKES, MAX_LIKES),
      comments: generateComments(),
      description: USER_DESCR[findRandomValue(USER_DESCR)]
    };
    arr.push(element);
  }
}

generateUserPhotos(photos);

// Функция создания DOM-элемента (фотография)
// на основании существуещего шаблона и заполнение его данными.
function createUserPhoto(photo) {
  var photoElement = similarPhotosTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').setAttribute('src', photo.user);
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
}

// Функция вставки на страницу DOM-элемента

function renderPhotos(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(createUserPhoto(arr[i]));
  }
  photosListElement.appendChild(fragment);
}

// Функция создания DOM-элемента комментарий к bigPhoto
function createCommentElement(comment) {

  var currentComment = socialComment.cloneNode(true);

  currentComment.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + randomInteger(1, 6) + '.svg');
  currentComment.querySelector('.social__text').textContent = comment;

  return currentComment;
}

renderPhotos(photos);

// Функция для работы с bigPicture
// Вставка аватара, коммента, кол-ва лайков, описание фотографии

function changeBigPicture() {
  // Базовый элемент - первый элемент из згенериров. массива
  var basePicture = photos[0];
  var basePictureComments = basePicture.comments;

  bigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', basePicture.user);
  bigPicture.querySelector('.likes-count').textContent = basePicture.likes;
  bigPicture.querySelector('.comments-count').textContent = basePictureComments.length;
  bigPicture.querySelector('.social__caption').textContent = basePicture.description;


  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < basePictureComments.length; i++) {
    var commentElement = createCommentElement(basePictureComments[i]);
    fragment.appendChild(commentElement);
  }

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
}

changeBigPicture();
