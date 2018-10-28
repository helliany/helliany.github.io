var button = document.querySelector(".main-nav__btn");
var menu_nav = document.querySelector(".site-list--nav");
var menu_user = document.querySelector(".site-list--user");

menu_nav.classList.remove("site-list--no-js");
menu_user.classList.remove("site-list--no-js");
button.classList.remove("main-nav__btn--no-js");
menu_nav.classList.add("site-list--js");
menu_user.classList.add("site-list--js");
button.classList.add("main-nav__btn--js");

button.addEventListener("click", function (evt) {
  evt.preventDefault();
  button.classList.toggle("main-nav__btn--close");
  menu_nav.classList.toggle("site-list--open");
  menu_user.classList.toggle("site-list--open");
});

var btn_offer = document.querySelector(".offers__product-btn");
var btn_product = document.querySelectorAll(".product__btn");
var popup = document.querySelector(".modal");
var overlay = document.querySelector(".overlay");
var input_focus = document.querySelector("#size-s");

if (btn_offer != null) {
  btn_offer.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("modal--open");
    overlay.classList.add("overlay--open");
    input_focus.focus();
  });
}

if (overlay != null) {
  overlay.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal--open");
    overlay.classList.remove("overlay--open");
  });
}

if (btn_product != null) {
  for (var i = 0; i < btn_product.length; i++) {
    btn_product[i].addEventListener("click", function (evt) {
      evt.preventDefault();
      popup.classList.add("modal--open");
      overlay.classList.add("overlay--open");
      input_focus.focus();
    });
  }
}

function initMap() {
  var contact_map = document.querySelector(".contacts__map-inner");
  var image = "img/icon-map-pin.svg";
  if (contact_map != null) {
    var options = {
      zoom: 17,
      center: {lat: 59.9387476, lng: 30.3230698}
    };
    var marker = new google.maps.Marker({
      position: {lat: 59.9387476, lng: 30.3230698},
      map: new google.maps.Map(contact_map, options),
      icon: image
    });
  }
}

google.maps.event.addDomListener(window, 'load', initMap);
