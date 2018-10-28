'use strict';

(function () {
  var contactLink = document.querySelector('.contacts__link');
  var mapLink = document.querySelector('.contacts__map-overlay');
  var contact = document.querySelector('.modal-contact');
  var map = document.querySelector('.modal-map');
  var fields = Array.prototype.slice.call(contact.querySelectorAll('.modal-contact__input[required]'));
  var field = contact.querySelector('.modal-contact__input[required]');
  var contactBtn = contact.querySelector('.modal-contact__btn-close');
  var mapBtn = map.querySelector('.modal-map__btn');
  var mapModal = map.querySelector('.modal-map__map');

  // валидация инпутов
  var validateFields = function (evt) {
    if (!evt.target.validity.valid) {
      evt.target.classList.add('modal-contact__input--invalid');
    } else {
      evt.target.classList.remove('modal-contact__input--invalid');
    }
  };

  // добавить обработчики событий на инпуты
  var onFieldInvalid = validateFields;
  var onFieldInput = validateFields;

  var addFieldsListeners = function () {
    fields.forEach(function (field) {
      field.addEventListener('invalid', onFieldInvalid);
      field.addEventListener('input', onFieldInput);
    });
  };

  //убрать обработчики событий с инпутов
  var removeFieldsListeners = function () {
    fields.forEach(function (field) {
      field.removeEventListener('invalid', onFieldInvalid);
      field.removeEventListener('input', onFieldInput);
    });
  };

  // открыть модалку "напишите нам"
  var onContactLinkClick = function (evt) {
    evt.preventDefault();
    addFieldsListeners();
    contact.classList.add("modal-contact--open");
    field.focus();
    contactBtn.addEventListener("click", onContactBtnClick);
  }

  contactLink.addEventListener('click', onContactLinkClick);

  // закрыть модалку
  var onContactBtnClick = function (evt) {
    evt.preventDefault();
    removeFieldsListeners();
    contact.classList.remove("modal-contact--open");
    contactBtn.removeEventListener("click", onContactBtnClick);
    fields.forEach(function (field) {
      field.classList.remove('modal-contact__input--invalid');
      field.value = "";
    });
  }

  // открыть модалку с картой
  var onMapLinkClick = function (evt) {
    evt.preventDefault();
    map.classList.add("modal-map--open");
    mapBtn.addEventListener("click", onMapBtnClick);
  }

  mapLink.addEventListener('click', onMapLinkClick);

  // закрыть модалку
  var onMapBtnClick = function (evt) {
    evt.preventDefault();
    map.classList.remove("modal-map--open");
    mapBtn.removeEventListener("click", onMapBtnClick);
  }
})();
