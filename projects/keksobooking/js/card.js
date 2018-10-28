'use strict';

(function () {
  var map = document.querySelector('.map');

  // создание карточки
  var getMapCard = function (mapCard) {
    var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
    var mapCardNode = mapCardTemplate.cloneNode(true);

    var valueToType = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом',
      palace: 'Дворец'
    };

    mapCardNode.querySelector('.popup__title').textContent = mapCard.offer.title;
    mapCardNode.querySelector('.popup__text--address').textContent = mapCard.offer.address;
    mapCardNode.querySelector('.popup__text--price').textContent = mapCard.offer.price + '₽/ночь';
    mapCardNode.querySelector('.popup__type').textContent = valueToType[mapCard.offer.type];
    mapCardNode.querySelector('.popup__text--capacity').textContent = mapCard.offer.rooms
      + ' ' + window.utils.getWordDecl(mapCard.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для '
      + mapCard.offer.guests + ' ' + window.utils.getWordDecl(mapCard.offer.guests, ['гостя', 'гостей', 'гостей']);
    mapCardNode.querySelector('.popup__text--time').textContent = 'Заезд после '
      + mapCard.offer.checkin + ', выезд до ' + mapCard.offer.checkout;
    mapCardNode.querySelector('.popup__features').textContent = '';
    for (var i = 0; i < mapCard.offer.features.length; i++) {
      mapCardNode.querySelector('.popup__features').insertAdjacentHTML('beforeend', '<li class="popup__feature popup__feature--'
        + mapCard.offer.features[i] + '"></li>');
    }
    mapCardNode.querySelector('.popup__description').textContent = mapCard.offer.description;
    mapCardNode.querySelector('.popup__photos').textContent = '';
    for (var j = 0; j < mapCard.offer.photos.length; j++) {
      mapCardNode.querySelector('.popup__photos').insertAdjacentHTML('beforeend', '<img src="'
        + mapCard.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
    }
    mapCardNode.querySelector('.popup__avatar').src = mapCard.author.avatar;
    return mapCardNode;
  };

  // отрисовка текущей карточки
  var renderCard = function (index) {
    var data = window.filter.updateData();
    var mapFilter = map.querySelector('.map__filters-container');
    map.insertBefore(getMapCard(data[index]), mapFilter);
  };

  // удаление карточек
  var removeCards = function () {
    var mapCards = map.querySelectorAll('.map__card');
    var mapPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapCards.forEach(function (cardItem) {
      cardItem.remove();
    });
    mapPins.forEach(function (pinItem) {
      pinItem.classList.remove('map__pin--active');
    });
  };

  window.card = {
    renderCard: renderCard,
    removeCards: removeCards
  };
})();
