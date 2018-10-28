'use strict';

(function () {
  var ADS_LENGTH = 5;
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var map = document.querySelector('.map');

  // создание меток на карте
  var getMapPin = function (mapPin) {
    var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPinNode = mapPinTemplate.cloneNode(true);
    mapPinNode.style = 'left: ' + (mapPin.location.x - 0.5 * MAP_PIN_WIDTH)
      + 'px; top: ' + (mapPin.location.y - MAP_PIN_HEIGHT) + 'px;';
    mapPinNode.querySelector('img').src = mapPin.author.avatar;
    mapPinNode.querySelector('img').alt = mapPin.offer.title;
    return mapPinNode;
  };

  // отрисовка пинов
  var renderPins = function (pins) {
    var mapList = map.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    var items = pins.length > ADS_LENGTH ? ADS_LENGTH : pins.length;
    for (var i = 0; i < items; i++) {
      var pin = getMapPin(pins[i]);
      pin.dataset.indexNumber = i;
      fragment.appendChild(pin);
    }
    mapList.appendChild(fragment);
  };

  // удаление пинов
  var removePins = function () {
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPins.forEach(function (item) {
      item.remove();
    });
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
