'use strict';

var USER_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var USER_DESCR = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var MAX_PHOTOS = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var DEFAULT_PHOTO_FILTER = 'img-upload__preview';
var MAX_HASH_TAGS = 5;
var MAX_HASH_TAG_LENGTH = 20;
var MAX_COMMENT_LENGTH = 140;

var similarPhotosTemplate = document.querySelector('#picture').content;
var photosListElement = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var closeBigPicture = bigPicture.querySelector('.big-picture__cancel');


var socialComments = document.querySelector('.social__comments');
var socialComment = document.querySelector('.social__comment');
var socialCommentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
// Контейнер для загрузки фотографии других пользователей
var uploadImages = document.querySelector('.pictures');
// Поле загрузки фотографии
var uploadFileInput = uploadImages.querySelector('.img-upload__input');
// Форма редактирования изображения
var uploadImgOverlay = uploadImages.querySelector('.img-upload__overlay');
// Предварительный просмотр изображения
var uploadImgPreview = uploadImages.querySelector('.img-upload__preview');
var closePreviewElement = uploadImages.querySelector('.img-upload__cancel');
// Список фото-фильтров
var uploadEffectsList = uploadImages.querySelector('.img-upload__effects');
// Слайдер, содержащий фото-фильтры
var photoFiltersSlider = uploadImages.querySelector('.img-upload__effect-level');

// Валидация формы
// Поле ввода хеш-тега
var hashtagsInput = document.querySelector('.text__hashtags');
// Поле ввода комментария
var commentInput = document.querySelector('.text__description');

// Ползунок(пин)
var pin = document.querySelector('.effect-level__pin');
// Поле содержащее значение наложенного эффекта
var effectLevelPin = document.querySelector('.effect-level__value');
// Индикатор насышенности эффекта
var effectLevelDepth = document.querySelector('.effect-level__depth');
// Мин. координата пина относительно левого края
var MIN_CLIENT_X = 0;
// Макс. координата пина относительно правого края
var MAX_CLIENT_X = 445;
// Макс. значение глубины цвета
var MAX_DEPTH_VAL = 100;


uploadFileInput.addEventListener('change', function () {
  openPreview();
});


closePreviewElement.addEventListener('click', function () {
  closePreview();
});

closePreviewElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePreview();
  }
});

// Реализация открытия/закрытия оверлея

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onPreviewEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && hashtagsInput !== document.activeElement && commentInput !== document.activeElement) {
    closePreview();
  }
};


var openPreview = function () {
  // Открыть оверлей
  // Утсановить значение фильтра по умолчанию (нет эффектов)
  // Скрыть слайдер
  uploadImgOverlay.classList.remove('hidden');
  document.getElementById('effect-none').checked = true;
  photoFiltersSlider.classList.add('hidden');
  document.addEventListener('keydown', onPreviewEscPress);
};

var openPopup = function () {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress);
};

var closePreview = function () {
  uploadImgOverlay.classList.add('hidden');
  uploadFileInput.value = '';
  document.removeEventListener('keydown', onPreviewEscPress);
};

// Функция сброса значение при переключении фильтрами
// Сбрасывает ранее примененные фильтры
// Устанавливает значение пина и шкалы насышенности в значение по-умолчанию
function restartFilter() {
  uploadImgPreview.style.filter = '';
  pin.style.left = MAX_CLIENT_X + 'px';
  effectLevelDepth.style.width = MAX_DEPTH_VAL + '%';
}

// Функция наложения фото-эффекта на фотографию
var changePhotoFilter = function (currentFilter) {
  restartFilter();

  if (currentFilter !== 'none') {
    photoFiltersSlider.classList.remove('hidden');
    uploadImgPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
    uploadImgPreview.classList.add('effects__preview--' + currentFilter);
  } else {
    uploadImgPreview.setAttribute('class', DEFAULT_PHOTO_FILTER);
    photoFiltersSlider.classList.add('hidden');
  }
};

// Функция поиска порядкового номера картинки
// Дважды отсекает из строки ненужные символы (из начала и конца строки)
var transformImgameSrc = function (target) {
  var imageSrcAtr = target.getAttribute('src');
  imageSrcAtr = imageSrcAtr.slice(7);
  imageSrcAtr = imageSrcAtr.slice(0, -4);
  return imageSrcAtr;
};

closeBigPicture.addEventListener('click', function () {
  closePopup();
});

closeBigPicture.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Реализация работы с фильтрами

uploadEffectsList.addEventListener('change', function (evt) {
  var targetValue = evt.target.value;
  changePhotoFilter(targetValue);
});

// Реализация работы с оверлеем (изменение bigPicture)

function renderUpdatedBigPicture(currentTarget) {
  // Поиск текущего элемента в массиве фотографи photos
  // Найти по src порядковый номер текущей картинки и уменшить его на 1
  var indexOfPhoto = transformImgameSrc(currentTarget) - 1;
  var currentPhoto = photos[indexOfPhoto];
  openPopup();
  pasteDataBigPicture(currentPhoto);
}

// Показ оверлея с текущей выбранной картинки при клике
uploadImages.addEventListener('click', function (evt) {
  var target = evt.target;

  if (target.parentNode.classList.contains('picture')) {
    renderUpdatedBigPicture(target);
  }
});

// Показ оверлея с текущей выбранной картинки при нажатии клавиши
uploadImages.addEventListener('keydown', function (evt) {
  var target = evt.target;


  if (evt.keyCode === ENTER_KEYCODE && target.classList.contains('picture')) {
    renderUpdatedBigPicture(target.firstElementChild);
  }
});

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
  photoElement.querySelector('.picture').setAttribute('tabindex', '0');

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

function changeBigPicture(basePicture) {

  bigPicture.querySelector('.big-picture__img').children[0].setAttribute('src', basePicture.user);
  bigPicture.querySelector('.likes-count').textContent = basePicture.likes;
  bigPicture.querySelector('.comments-count').textContent = basePicture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = basePicture.description;
}

// Функция для работы с bigPicture
// Вставка аватара, коммента, кол-ва лайков, описание фотографии
// Базовый элемент - первый элемент из згенериров. массива

function pasteDataBigPicture(baseElement) {
  changeBigPicture(baseElement);

  socialCommentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < baseElement.comments.length; i++) {
    var commentElement = createCommentElement(baseElement.comments[i]);
    fragment.appendChild(commentElement);
  }

  socialComments.innerHTML = '';
  socialComments.appendChild(fragment);
}

openPopup();

// -------------------------------------------------------------------------------//
// Валидация формы

hashtagsInput.addEventListener('input', function () {
  validateHashTags(hashtagsInput);
});

commentInput.addEventListener('input', function () {
  validateComment(commentInput);
});

// Функция поиска одинаковых хеш-тегов
function findSameHashTags(array, item) {
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
}

// Функция валидации поля формы хеш-тег
function validateHashTags(input) {
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
    } else if (findSameHashTags(hashtagsArrays, currentElement)) {
      input.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
    } else if (hashtagsArrays.length > MAX_HASH_TAGS) {
      input.setCustomValidity('нельзя указать больше пяти хэш-тегов');
    } else if (currentElement.length > MAX_HASH_TAG_LENGTH) {
      input.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
    } else {
      input.setCustomValidity('');
    }
  }
}

// Функция валидации поля формы коммантарий
function validateComment(input) {
  if (input.value.length > MAX_COMMENT_LENGTH) {
    input.setCustomValidity('длина комментария не может составлять больше 140 символов');
  } else {
    input.setCustomValidity('');
  }
}

// Работа с перемещением пина и изменение наложенных на фотографию эффектов


function filtration(filterValue) {
  // пропорция для расчета уровня фильтра
  var proportion = Math.ceil((3 * filterValue) / 100);

  if (uploadImgPreview.classList.contains('effects__preview--chrome')) {

    uploadImgPreview.style.filter = 'grayscale(' + filterValue + '% )';
  } else if (uploadImgPreview.classList.contains('effects__preview--sepia')) {

    uploadImgPreview.style.filter = 'sepia(' + filterValue + '% )';
  } /* else if (uploadImgPreview.classList.contains('effects__preview--marvin')) {

    uploadImgPreview.style.filter = 'invert(' + filterValue + '%)';
  }*/
}


pin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var coords = pin.getBoundingClientRect();

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
    percent = Math.ceil((deviation * 100) / MAX_CLIENT_X);


    if (deviation >= MIN_CLIENT_X && deviation <= MAX_CLIENT_X) {
      pin.style.left = deviation + 'px';
      effectLevelPin.setAttribute('value', percent);
      // Изменение шкалы насышенности цвета. Принимает процентное соотношение percent
      effectLevelDepth.style.width = percent + '%';
      filtration(percent);
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
