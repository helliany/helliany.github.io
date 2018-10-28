'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_SRC = 'img/muffin-grey.svg';

  var form = document.querySelector('.ad-form');
  var avatarDropZone = form.querySelector('.ad-form-header__drop-zone');
  var avatarChooser = form.querySelector('.ad-form-header__input');
  var avatarPreview = form.querySelector('.ad-form-header__preview img');
  var photoContainer = form.querySelector('.ad-form__photo-container');
  var photoDropZone = photoContainer.querySelector('.ad-form__drop-zone');
  var photoChooser = photoContainer.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = photoContainer.querySelector('.ad-form__photo');

  // проверяет соответствие загружаемого файла
  var matchFileType = function (files, action) {
    Array.from(files).forEach(function (item) {
      var reader = new FileReader();
      var fileName = item.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        reader.readAsDataURL(item);
        reader.addEventListener('load', function () {
          action(reader.result);
        });
      }
    });
  };

  // выбор файла перетаскиванием
  var onZoneDragOver = function (evt) {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
  };

  // загрузка аватарки
  var loadAvatar = function (value) {
    avatarPreview.src = value;
  };

  // загрузка фото жилья
  var loadPhoto = function (value) {
    photoPreview.classList.remove('ad-form__photo--main');
    photoPreview.classList.add('hidden');
    var photoPreviewNode = photoPreview.cloneNode(true);
    photoPreviewNode.insertAdjacentHTML('beforeend', '<img src="' + value
      + '" width="70" height="70" alt="Фотография жилья">');
    photoPreviewNode.classList.remove('hidden');
    photoContainer.appendChild(photoPreviewNode);
  };

  var onAvatarInputChange = function (evt) {
    matchFileType(evt.target.files, loadAvatar);
  };

  var onAvatarZoneDrop = function (evt) {
    evt.preventDefault();
    matchFileType(evt.dataTransfer.files, loadAvatar);
  };

  var onPhotoInputChange = function (evt) {
    matchFileType(evt.target.files, loadPhoto);
    evt.target.value = null;
  };

  var onPhotoZoneDrop = function (evt) {
    evt.preventDefault();
    matchFileType(evt.dataTransfer.files, loadPhoto);
  };

  // добавить обработчики событий на поля загрузки
  var addListeners = function () {
    avatarChooser.addEventListener('change', onAvatarInputChange);
    avatarDropZone.addEventListener('dragover', onZoneDragOver);
    avatarDropZone.addEventListener('drop', onAvatarZoneDrop);

    photoChooser.addEventListener('change', onPhotoInputChange);
    photoDropZone.addEventListener('dragover', onZoneDragOver);
    photoDropZone.addEventListener('drop', onPhotoZoneDrop);
  };

  // удалить обработчики событий с полей загрузки
  var removeListeners = function () {
    avatarChooser.removeEventListener('change', onAvatarInputChange);
    avatarDropZone.removeEventListener('dragover', onZoneDragOver);
    avatarDropZone.removeEventListener('drop', onAvatarZoneDrop);

    photoChooser.removeEventListener('change', onPhotoInputChange);
    photoDropZone.removeEventListener('dragover', onZoneDragOver);
    photoDropZone.removeEventListener('drop', onPhotoZoneDrop);
  };

  // удаление файлов
  var removeImages = function () {
    photoPreview.classList.add('ad-form__photo--main');
    photoPreview.classList.remove('hidden');
    avatarPreview.src = AVATAR_SRC;
    var photos = photoContainer.querySelectorAll('.ad-form__photo:not(.ad-form__photo--main)');
    photos.forEach(function (item) {
      item.remove();
    });
  };

  window.images = {
    addListeners: addListeners,
    removeListeners: removeListeners,
    removeImages: removeImages
  };
})();
