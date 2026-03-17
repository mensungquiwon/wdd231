const year = document.querySelector("#currentYear");
const today = new Date();
const month = today.getMonth() + 1;
const date = today.getDate();
const fullYear = today.getFullYear();
year.innerHTML = `${today.getFullYear()}`;
document.getElementById("lastModified").textContent = "Last Modified: " + month + "/" + date + "/" + fullYear;
const hamBtn = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

hamBtn.addEventListener("click", () => {
    hamBtn.classList.toggle("show");
    navBar.classList.toggle("show");
});

async function loadMembers() {
    try {
        const response = await fetch('./data/members.json');
        const data = await response.json();
        console.log(data); 
        displayMembers(data);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

loadMembers();
function displayMembers(members) {
    const cardsContainer = document.querySelector("#cards");
    cardsContainer.innerHTML = ""; 
    members.forEach(member => {

        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${member.imageHref}" alt="${member.name} logo" loading="lazy" onerror="this.src='./images/placeholder.png'">
            <h2>${member.name}</h2>
            <p>${member.addresses[0]}</p>
            <p>📞${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `

        cardsContainer.appendChild(card);
    });
}

const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const cards = document.querySelector("#cards");

gridBtn.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");

    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");

    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});