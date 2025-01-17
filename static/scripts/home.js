"use strict";
const form = document.getElementById("menu-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    for (const [, value] of form.querySelectorAll("input").entries()) {
        if (value.checked) {
            console.log(value);
            window.location.href = "game";
        }
    }
});
