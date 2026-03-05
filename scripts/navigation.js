const navbutton = document.querySelector("#ham-btn");
const navEl = document.querySelector('#nav-bar');

navbutton.addEventListener('click', () => {
    navEl.classList.toggle('show');
    navbutton.classList.toggle('show');
});

const year = document.querySelector("#currentYear");
const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const fullYear = today.getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + month + "/" + date + "/" + fullYear;

