'use strict';

(function () {
  var VALUE_ROOM_NO_GUESTS = 100;
  var VALUE_CAPACITY_NO_GUESTS = 0;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 85;
  var START_PIN_MAIN_X = 570;
  var ESC_KEYCODE = 27;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var fields = document.querySelectorAll('input[required]');
  var typeField = form.querySelector('#type');
  var timeInField = form.querySelector('#timein');
  var timeOutField = form.querySelector('#timeout');
  var roomField = form.querySelector('#room_number');
  var addressField = form.querySelector('#address');
  var successMessage = document.querySelector('.success');
  var filter = map.querySelector('.map__filters');

  // словарь типов жилья и цены
  var typeToPrice = {
    flat: '1000',
    bungalo: '0',
    house: '5000',
    palace: '10000'
  };

  // поля формы и селекты фильтра заблокированы
  var disableFields = function (value) {
    var formFieldsets = form.querySelectorAll('fieldset');
    var selects = filter.querySelectorAll('select');
    var filterFieldset = filter.querySelector('fieldset');
    formFieldsets.forEach(function (fieldset) {
      fieldset.disabled = value;
    });
    selects.forEach(function (select) {
      select.disabled = value;
    });
    filterFieldset.disabled = value;
  };

  // синхронизация типа жилья и цены
  var syncTypePrice = function () {
    var priceField = form.querySelector('#price');
    var userType = typeField.options[typeField.selectedIndex].value;
    var userPrice = typeToPrice[userType];
    priceField.min = userPrice;
    priceField.placeholder = userPrice;
  };

  var onTypeChange = syncTypePrice;

  // синхронизация времени заезда и выезда
  var onTimeInChange = function () {
    timeOutField.value = timeInField.value;
  };

  var onTimeOutChange = function () {
    timeInField.value = timeOutField.value;
  };

  // синхронизация комнат и гостей
  var syncRoomsGuests = function () {
    var capacityFields = form.querySelectorAll('#capacity option');
    capacityFields.forEach(function (item) {
      var userRoom = parseInt(roomField.value, 10);
      var value = parseInt(item.value, 10);
      if (userRoom === VALUE_ROOM_NO_GUESTS) {
        item.disabled = (value !== VALUE_CAPACITY_NO_GUESTS);
        item.selected = (value === VALUE_CAPACITY_NO_GUESTS);
      } else {
        item.disabled = (value === VALUE_CAPACITY_NO_GUESTS || value > userRoom);
        item.selected = (value === userRoom);
      }
    });
  };

  var onRoomChange = syncRoomsGuests;

  // координаты главного пина
  var setCoords = function () {
    addressField.value = (mapPinMain.offsetLeft + Math.floor(MAP_PIN_MAIN_WIDTH * 0.5))
      + ', ' + (mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT);
  };

  // валидация инпутов
  var validateFields = function (evt) {
    if (!evt.target.validity.valid) {
      evt.target.classList.add('ad-form__element--invalid');
    } else {
      evt.target.classList.remove('ad-form__element--invalid');
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

  // убрать рамки и обработчики событий с инпутов
  var removeFieldsListeners = function () {
    fields.forEach(function (field) {
      field.removeEventListener('invalid', onFieldInvalid);
      field.removeEventListener('input', onFieldInput);
      field.classList.remove('ad-form__element--invalid');
    });
  };

  // сообщение об ошибке загрузки
  var getError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 3; width: 100%; height: 100%; padding-top: 300px; text-align: center; background-color: rgba(0, 0, 0, 0.8)';
    node.style.position = 'fixed';
    node.style.left = '0';
    node.style.top = '0';
    node.style.fontSize = '50px';
    node.style.color = '#ffffff';
    node.style.fontWeight = '700';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    return node;
  };

  var onLoadError = getError;

  // скрываемое сообщение об ошибке загрузки
  var showErrorMsg = function (errorMessage) {
    var node = getError(errorMessage);
    var closeErrorMsg = function () {
      node.remove();
      document.removeEventListener('click', onErrorClick);
      document.removeEventListener('keydown', onErrorEscPress);
    };

    var onErrorClick = closeErrorMsg;
    var onErrorEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeErrorMsg();
      }
    };

    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  // показывает сообщение об успешной отправке формы
  var showSuccessMsg = function () {
    successMessage.classList.remove('hidden');
    var closeSuccessMsg = function () {
      successMessage.classList.add('hidden');
      successMessage.removeEventListener('click', onSuccessClick);
      document.removeEventListener('keydown', onSuccessEscPress);
    };

    var onSuccessClick = closeSuccessMsg;
    var onSuccessEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeSuccessMsg();
      }
    };

    successMessage.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  // сброс формы, координат главного пина
  var resetForm = function () {
    mapPinMain.style.top = (map.offsetHeight * 0.5) + 'px';
    mapPinMain.style.left = START_PIN_MAIN_X + 'px';

    map.classList.add('map--faded');
    form.classList.add('ad-form--disabled');

    window.pin.removePins();
    window.card.removeCards();
    window.images.removeImages();
    disableFields(true);
    setTimeout(function () {
      syncTypePrice();
      syncRoomsGuests();
      setCoords();
    });
    filter.reset();
    removeListeners();
    window.map.loadPage();
  };

  var onFormReset = resetForm;

  // отмена действия формы по умолчанию, отправка формы
  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(form), function () {
      resetForm();
      form.reset();
      showSuccessMsg();
    }, showErrorMsg);
    evt.preventDefault();
  };

  // добавить обработчики событий на форму
  var addListeners = function () {
    typeField.addEventListener('change', onTypeChange);
    timeInField.addEventListener('change', onTimeInChange);
    timeOutField.addEventListener('change', onTimeOutChange);
    roomField.addEventListener('change', onRoomChange);
    form.addEventListener('reset', onFormReset);
    form.addEventListener('submit', onFormSubmit);
    addFieldsListeners();
    window.images.addListeners();
  };

  // удалить обработчики событий с формы
  var removeListeners = function () {
    typeField.removeEventListener('change', onTypeChange);
    timeInField.removeEventListener('change', onTimeInChange);
    timeOutField.removeEventListener('change', onTimeOutChange);
    roomField.removeEventListener('change', onRoomChange);
    form.removeEventListener('reset', onFormReset);
    form.removeEventListener('submit', onFormSubmit);
    removeFieldsListeners();
    window.images.removeListeners();
  };

  window.form = {
    addListeners: addListeners,
    disableFields: disableFields,
    setCoords: setCoords,
    syncTypePrice: syncTypePrice,
    syncRoomsGuests: syncRoomsGuests,
    onLoadError: onLoadError
  };
})();
