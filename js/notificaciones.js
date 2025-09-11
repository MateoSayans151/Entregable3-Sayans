import {showCards} from "./pokemones.js";
Toastify({
    text: "Hello World!",
}).showToast();

document.addEventListener("DOMContentLoaded", () => {
    showCards();
});
