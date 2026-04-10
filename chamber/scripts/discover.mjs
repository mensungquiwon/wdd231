const hamBtn = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

if (hamBtn && navBar) {
    hamBtn.addEventListener("click", () => {
        hamBtn.classList.toggle("show");
        navBar.classList.toggle("show");
    });
}

import { businessesData } from "../data/businesses.mjs";
const cardsContainer = document.querySelector("#discover-cards");

function displayBusinesses(businesses) {
    if (!cardsContainer) return;

    businesses.forEach(business => {
        const card = document.createElement("div");

        // Add hover effect class
        card.classList.add("hover"); 

        const picture = document.createElement("img");
        picture.src = `images/${business.image}`;
        picture.alt = business.name;
        card.appendChild(picture);

        const title = document.createElement("h2");
        title.textContent = business.name;
        card.appendChild(title);

        const location = document.createElement("address");
        location.textContent = business.address;
        card.appendChild(location);

        const description = document.createElement("p");
        description.textContent = business.description;
        card.appendChild(description);

    cardsContainer.appendChild(card);
  });
}
displayBusinesses(businessesData.items);

const year = document.querySelector("#currentYear");
if (year) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const fullYear = today.getFullYear();
    year.textContent = fullYear;

    const lastMod = document.getElementById("lastModified");
    if (lastMod) {
        lastMod.textContent = `Last Modified: ${month}/${date}/${fullYear}`;
    }
}

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastDiscoverVisit");
const now = Date.now();

let message;

if (!lastVisit) {
  // ✅ First visit
  message = "Welcome! Let us know if you have any questions.";
} else {
  const lastVisitTime = Number(lastVisit);
  const daysBetween = Math.floor(
    (now - lastVisitTime) / (1000 * 60 * 60 * 24)
  );

  if (daysBetween < 1) {
    // ✅ Less than one day
    message = "Back so soon! Awesome!";
  } else {
    // ✅ One day or more (handle grammar)
    message = `You last visited ${daysBetween} ${
      daysBetween === 1 ? "day" : "days"
    } ago.`;
  }
}

// ✅ Display message with the h1
visitMessage.textContent = message;

// ✅ Save visit time for next visit
localStorage.setItem("lastDiscoverVisit", now);