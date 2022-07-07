"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.querySelector(".review__form");
  form.addEventListener("submit", formSend);

  function formSend(event) {
    event.preventDefault();
    document.querySelector(".write-review__container").classList.add("_sending");
    var formData = new FormData(form);
    var response = fetch("sendmail.php", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      var result = response.json();
      alert(result.message);
      form.reset();
      form.classList.remove("_sending");
    } else {
      form.classList.remove("_sending");
    }
  }
});