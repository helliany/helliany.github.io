'use strict';

(function () {
  var map = document.querySelector('.map');
  var filter = map.querySelector('.map__filters');
  var type = filter.querySelector('#housing-type');
  var price = filter.querySelector('#housing-price');
  var room = filter.querySelector('#housing-rooms');
  var guest = filter.querySelector('#housing-guests');
  var features = filter.querySelector('.map__features');
  var newData = [];

  var valueToPrice = {
    low: '10000',
    high: '50000'
  };

  var onLoadSuccess = function (data) {
    newData = data;
    window.pin.renderPins(newData);
  };

  // сортировка по типу жилья
  var filterType = function (item) {
    return type.value === 'any' || item.offer.type === type.value;
  };

  // сортировка по ценам
  var filterPrice = function (item) {
    switch (price.value) {
      case 'low':
        return item.offer.price < valueToPrice.low;
      case 'middle':
        return item.offer.price >= valueToPrice.low && item.offer.price < valueToPrice.high;
      case 'high':
        return item.offer.price >= valueToPrice.high;
      default:
        return true;
    }
  };

  // сортировка по комнатам
  var filterRoom = function (item) {
    return room.value === 'any' || item.offer.rooms.toString() === room.value;
  };

  // сортировка по гостям
  var filterGuest = function (item) {
    return guest.value === 'any' || item.offer.guests.toString() === guest.value;
  };

  // сортировка по преимуществам
  var filterFeatures = function (item) {
    var checkedFields = features.querySelectorAll('input:checked');
    var fieldsArray = Array.from(checkedFields);
    var selectedFields = fieldsArray.map(function (feature) {
      return feature.value;
    });
    return selectedFields.every(function (featureValue) {
      return item.offer.features.includes(featureValue);
    });
  };

  // обновление данных
  var updateData = function () {
    var sortedData = newData.filter(filterType).filter(filterPrice)
    .filter(filterRoom).filter(filterGuest).filter(filterFeatures);
    return sortedData;
  };

  // фильтруем данные
  var onFilterChange = function () {
    window.pin.removePins();
    window.card.removeCards();
    var updatedData = updateData();
    window.pin.renderPins(updatedData);
  };

  filter.addEventListener('change', function () {
    window.utils.debounce(onFilterChange);
  });

  window.filter = {
    onLoadSuccess: onLoadSuccess,
    updateData: updateData
  };

})();
