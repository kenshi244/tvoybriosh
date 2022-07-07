document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".review__form");
    form.addEventListener("submit", formSend);

    function formSend(event) {
        event.preventDefault();
        document.querySelector(".write-review__container").classList.add("_sending");
        let formData = new FormData(form);

        let response = fetch("sendmail.php", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            let result = response.json();
            alert(result.message);
            form.reset();
            form.classList.remove("_sending");
        } else {
            form.classList.remove("_sending");
        }
    }
});