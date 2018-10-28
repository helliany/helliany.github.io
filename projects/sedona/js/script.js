var button = document.querySelector(".search-button");

var popup = document.querySelector(".modal-search");

var form = document.querySelector(".search-form");
var date_from = popup.querySelector("[name=date-from]");
var date_to = popup.querySelector("[name=date-to]");
var adult = popup.querySelector("[name=adults]");
var child = popup.querySelector("[name=children]");

var isStorageSupport = true;
var storage_adult = "";
var storage_child = "";

try {
  storage_adult = localStorage.getItem("adult");
  storage_child = localStorage.getItem("child");
} catch (err) {
  isStorageSupport = false;
}

button.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.toggle("modal-show");
  popup.classList.remove("modal-error");
  date_from.focus();

  if (storage_adult) {
    adult.value = storage_adult;
  } else if (storage_child) {
    child.value = storage_child;
  }
});

form.addEventListener("submit", function (evt) {
  if (!date_from.value || !date_to.value || !adult.value || !child.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else if (isStorageSupport) {
    localStorage.setItem("adult", adult.value);
    localStorage.setItem("child", child.value);
  }
});
