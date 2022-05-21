"use strict";

[].forEach.call(document.querySelectorAll('#telephoneInput'), function (input) {
  var keyCode;

  function mask(event) {
    event.keyCode && (keyCode = event.keyCode);
    var pos = this.selectionStart;
    if (pos < 3) event.preventDefault();
    var matrix = "+7 (___) ___-__-__",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = newValue.indexOf("_");

    if (i != -1) {
      i < 5 && (i = 3);
      newValue = newValue.slice(0, i);
    }

    var reg = matrix.substr(0, this.value.length).replace(/_+/g, function (a) {
      return "\\d{1," + a.length + "}";
    }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
    if (event.type == "blur" && this.value.length < 5) this.value = "";
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false);
});
var inputs = document.querySelector(".review__form").elements;

var _loop = function _loop(i) {
  inputs[i].addEventListener("change", function () {
    !inputs[i].checkValidity() || inputs[i].value.length === 0 ? inputs[i].classList.add("error") : inputs[i].classList.remove("error");
  });
};

for (var i = 0; i < inputs.length; i++) {
  _loop(i);
}