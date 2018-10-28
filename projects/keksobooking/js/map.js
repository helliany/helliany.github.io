'use strict';

(function () {
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 1200;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 85;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var addressField = form.querySelector('#address');

  // переключение карты из неактивного состояния в активное
  var onPinMainMouseUp = function () {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    window.form.addListeners();
    window.form.disableFields(false);
    window.backend.load(window.filter.onLoadSuccess, window.form.onLoadError);
    mapPinMain.removeEventListener('mouseup', onPinMainMouseUp);
  };

  // перетаскивание главного пина
  var onPinMainMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinX = mapPinMain.offsetLeft - shift.x;
      var mapPinY = mapPinMain.offsetTop - shift.y;

      var mapPinMaxY = LOCATION_Y_MAX - MAP_PIN_MAIN_HEIGHT;
      var mapPinMinY = LOCATION_Y_MIN - MAP_PIN_MAIN_HEIGHT;
      var mapPinMaxX = LOCATION_X_MAX - Math.floor(MAP_PIN_MAIN_WIDTH * 0.5);
      var mapPinMinX = LOCATION_X_MIN - Math.floor(MAP_PIN_MAIN_WIDTH * 0.5);

      mapPinY = (mapPinY > mapPinMaxY) ? mapPinMaxY : mapPinY;
      mapPinY = (mapPinY < mapPinMinY) ? mapPinMinY : mapPinY;
      mapPinX = (mapPinX > mapPinMaxX) ? mapPinMaxX : mapPinX;
      mapPinX = (mapPinX < mapPinMinX) ? mapPinMinX : mapPinX;

      mapPinMain.style.top = mapPinY + 'px';
      mapPinMain.style.left = mapPinX + 'px';
      addressField.value = (mapPinX + Math.floor(MAP_PIN_MAIN_WIDTH * 0.5))
        + ', ' + (mapPinY + MAP_PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // запускает один раз загрузку пинов и карточек
  var loadPage = function () {
    mapPinMain.addEventListener('mouseup', onPinMainMouseUp);
  };

  // форма заблокирована
  var disableForm = function () {
    window.form.disableFields(true);
    window.form.setCoords();
    window.form.syncTypePrice();
    window.form.syncRoomsGuests();
    loadPage();
  };

  // показываем карточку
  map.addEventListener('click', function (evt) {
    var target = evt.target;
    var mapPin = target.closest('.map__pin:not(.map__pin--main)');
    var pinMain = target.closest('.map__pin--main');
    if (mapPin) {
      closePopup();
      initializePopup(mapPin);
    } else if (pinMain) {
      closePopup();
    }
  });

  var initializePopup = function (mapPin) {
    if (mapPin) {
      var index = parseInt(mapPin.dataset.indexNumber, 10);
      window.card.renderCard(index);
      mapPin.classList.add('map__pin--active');
      addListeners();
    }
  };

  // прячем карточку
  var closePopup = function () {
    window.card.removeCards();
    document.removeEventListener('keydown', onEscPress);
  };

  var onBtnClick = closePopup;

  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var addListeners = function () {
    var btnsClose = map.querySelectorAll('.popup__close');
    btnsClose.forEach(function (btnClose) {
      btnClose.addEventListener('click', onBtnClick);
    });
    document.addEventListener('keydown', onEscPress);
  };

  disableForm();
  mapPinMain.addEventListener('mousedown', onPinMainMouseDown);

  window.map = {
    loadPage: loadPage
  };
})();
