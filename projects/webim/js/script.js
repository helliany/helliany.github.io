(function () {
  var menuBtn = document.querySelector(".nav__btn");
  var menu = document.querySelector(".nav__list-wrapper");

  function onMenuBtnClick() {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      menuBtn.classList.toggle('active');
      menu.classList.toggle('nav__list-wrapper--active');
    })
  }

  onMenuBtnClick();
})();
