'use strict';
(function () {
  // Функция поиска порядкового номера картинки
  // Дважды отсекает из строки ненужные символы (из начала и конца строки)
  var transformImgameSrc = function (target) {
    var imageSrcAtr = target.getAttribute('src');
    imageSrcAtr = imageSrcAtr.slice(7);
    imageSrcAtr = imageSrcAtr.slice(0, -4);
    return imageSrcAtr;
  };

  // Реализация работы с оверлеем (изменение bigPicture)

  window.renderUpdatedBigPicture = function (currentTarget) {
    // Поиск текущего элемента в массиве фотографи photos
    // Найти по src порядковый номер текущей картинки и уменшить его на 1
    var indexOfPhoto = transformImgameSrc(currentTarget) - 1;
    var currentPhoto = photos[indexOfPhoto];
    window.openPopup();
    window.pasteDataBigPicture(currentPhoto);
  };
})();
