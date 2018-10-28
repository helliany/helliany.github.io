'use strict';

(function () {
  var header = document.querySelector('.header');
  var fieldSearch = header.querySelector('.header__input');
  var btnSearch = header.querySelector('.header__btn');
  var btnCatalog = header.querySelector('.header__catalog-btn');
  var catalog = header.querySelector('.header__catalog');
  var serviceBtns = Array.prototype.slice.call(document.querySelectorAll('.services__btn'));
  var services = Array.prototype.slice.call(document.querySelectorAll('.services__block'));
  var promo = Array.prototype.slice.call(document.querySelectorAll('.promo__item'));
  var promoBtns = Array.prototype.slice.call(document.querySelectorAll('.promo__btn'));

  // поиск по сайту, кнопка "найти" по инпуту
  var onFieldInput = function () {
    btnSearch.classList.add('header__btn--show');

    if (fieldSearch.value === '') {
      btnSearch.classList.remove('header__btn--show');
    }
  }

  fieldSearch.addEventListener('input', onFieldInput);

  // показать меню каталога
  var showMenu = function (evt) {
    catalog.classList.add('header__catalog--show');
    btnCatalog.addEventListener('click', onBtnClick);
    btnCatalog.addEventListener('mouseout', onBtnMouseout);
  }

  var hideMenu = function (evt) {
    catalog.classList.remove('header__catalog--show');
  }

  var onBtnClick = function () {
    catalog.classList.add('header__catalog--show');
    btnCatalog.removeEventListener('click', onBtnClick);
    btnCatalog.removeEventListener('mouseout', onBtnMouseout);
  }

  var onBtnMouseover = showMenu;
  var onBtnMouseout = hideMenu;

  btnCatalog.addEventListener('mouseover', onBtnMouseover);

  // слайдер услуг
  var slideService = function () {
    serviceBtns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        serviceBtns.forEach(function (serviceBtn) {
          serviceBtn.classList.remove('services__btn--active');
        });
        services.forEach(function (block) {
          block.classList.remove('services__block--active');
        });
        btn.classList.add('services__btn--active');
        services[i].classList.add('services__block--active');
      });
    });
  }

  // слайдер промо
  var slidePromo = function () {
    promoBtns.forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        promoBtns.forEach(function (promoBtn) {
          promoBtn.classList.remove('promo__btn--active');
        });
        promo.forEach(function (item) {
          item.classList.remove('promo__item--active');
        });
        btn.classList.add('promo__btn--active');
        promo[i].classList.add('promo__item--active');
      });
    });
  }

  slideService();
  slidePromo();
})();
