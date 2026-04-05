// ===== YEAR & LAST MODIFIED =====
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

// ===== HAMBURGER MENU =====
const hamBtn = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");

if (hamBtn && navBar) {
    hamBtn.addEventListener("click", () => {
        hamBtn.classList.toggle("show");
        navBar.classList.toggle("show");
    });
}

// ===== LOAD MEMBERS =====
async function loadMembers() {
    try {
        const response = await fetch('./data/members.json');
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

function displayMembers(members) {
    const cardsContainer = document.querySelector("#cards");
    if (!cardsContainer) return;

    cardsContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${member.imageHref}" alt="${member.name} logo" loading="lazy" onerror="this.src='./images/placeholder.png'">
            <h2>${member.name}</h2>
            <p>${member.addresses[0]}</p>
            <p>📞 ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        cardsContainer.appendChild(card);
    });
}

loadMembers();

// ===== GRID / LIST BUTTONS =====
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const cards = document.querySelector("#cards");

if (gridBtn && listBtn && cards) {
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
}

// ===== WEATHER API =====
const condition = document.querySelector('#weather');
const forecast = document.querySelector('#forecast-card');

if (condition) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=7.25&lon=-8.97&units=imperial&appid=721b6ea3204b97aede9eeb014aa3ca63';
    
    async function weatherApi() {
        try {
            const response = await fetch(url);
            

            if (response.ok) {
                const data = await response.json();
                const icon = data.weather[0].icon;
                condition.innerHTML = `
                    <h3>Current Weather</h3>
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
                    <p>Temperature: ${data.main.temp}°F</p>
                    <p>Conditions: ${data.weather[0].description}</p>
                `;
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.error('Weather API error:', error);
            condition.innerHTML = '<p>Weather data is not available right now.</p>';
        }
    }

    weatherApi();
}

// ===== 3-DAY FORECAST =====
const forecaster = document.querySelector('#forecast');

if (forecaster) {
    const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=7.25&lon=-8.97&units=imperial&appid=721b6ea3204b97aede9eeb014aa3ca63";

    async function loadForecast() {
        try {
            const response = await fetch(forecastURL);
            if (!response.ok) {
                throw new Error("Forecast data failed.");
            }

            const data = await response.json();
            console.log("Forecast Data:", data);

            // Filter entries at 12 PM
            const daily = data.list.filter(entry =>
                entry.dt_txt.includes("12:00:00")
            );

            const next3 = daily.slice(0, 3);

            forecaster.innerHTML = "";

            next3.forEach(day => {
                const dateObject = new Date(day.dt_txt);

                const label = dateObject.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric"
                });

                const icon = day.weather[0].icon;
                const temp = Math.round(day.main.temp);
                const desc = day.weather[0].description;

                forecaster.innerHTML += `
                   
                    <div class="forecast">
                        <h3>Forecast</h3>
                        <p><strong>${label}</strong></p>
                        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}">
                        <p><strong>${temp}°F</strong></p>
                        <p>Conditions: ${desc}</p>
                    </div>
                `;
            });
        } catch (error) {
            console.error("3-Day Forecast Error:", error);
            forecaster.innerHTML =
                "<p>Forecast is not available right now.</p>";
        }
    }

    loadForecast();
}

// ====== spolight =========

const container = document.querySelector("#companies");

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();

        // 1. FILTER Gold (1) and Silver (2)
        const qualified = members.filter(m =>
            m.membership === 1 || m.membership === 2
        );

        // 2. RANDOMIZE order
        const shuffled = qualified.sort(() => 0.5 - Math.random());

        // 3. Select 2 OR 3 — choose 3 to be safe
        const selected = shuffled.slice(0, 3);

        // 4. Display them
        container.innerHTML = "";

        selected.forEach(company => {
            const levelClass = company.membership === 1 ? "gold" : "silver";
            container.innerHTML += `
                <div class="company-card ${levelClass}">
                
                <img src="${company.imageHref}" alt="${company.name} logo">
                <h3>${company.name}</h3>
                    <p><strong>Phone:</strong> ${company.phone}</p>
                    <p><strong>Address:</strong> ${company.addresses[0]}</p>
                    <p><strong>Website:</strong> <a href="${company.website}" target="_blank">${company.website}</a></p>

                    <p class="level ${company.membership === 1 ? "gold" : "silver"}"><strong>Membership Level:</strong> 
                        ${company.membership === 1 ? "Gold" : "Silver"}
                    </p>
                </div>
            `;
        });

    } catch (error) {
        console.error("Spotlight loading error:", error);
        container.innerHTML = "<p>Unable to load spotlight members.</p>";
    }
}

loadSpotlights();

// ===== JOIN FORM TIMESTAMP =====
const timestampInput = document.querySelector("#timestamp");
timestampInput.value = new Date().toISOString();    


const nonProfitButton = document.querySelector('#nonProfitButton');
const bronzeButton = document.querySelector('#bronzeButton');
const silverButton = document.querySelector('#silverButton');
const goldButton = document.querySelector('#goldButton');
const dialog = document.querySelector('#dialogbox');
const closeDialogButton = document.querySelector('#closeDialog');

const dialogBoxText = document.querySelector('#dialogbox div');

nonProfitButton?.addEventListener('click', () => {
    dialogBoxText.textContent = "Non-profit members receive a free listing on our website and access to our monthly newsletter.";
    dialog?.showModal();
});

bronzeButton?.addEventListener('click', () => {
    dialogBoxText.textContent = "Bronze members receive a discounted rate on our services and access to our quarterly newsletter.";
    dialog?.showModal();
});

silverButton?.addEventListener('click', () => {
    dialogBoxText.textContent = "Silver members receive a free listing on our website and access to our monthly newsletter.";
    dialog?.showModal();
});

goldButton?.addEventListener('click', () => {
    dialogBoxText.textContent = "Gold members receive priority support and access to our exclusive monthly newsletter.";
    dialog?.showModal();
});

closeDialogButton?.addEventListener('click', () => {
    dialog?.close();
});


const params = new URLSearchParams(window.location.search);
const results = document.getElementById("results");

const timestamp = params.get("date");
const formattedDate = timestamp
  ? new Date(timestamp).toLocaleString()
  : "N/A";

// 
results.innerHTML = `
  <p><strong>First Name:</strong> ${params.get("first") || "N/A"}</p>
  <p><strong>Last Name:</strong> ${params.get("last") || "N/A"}</p>
  <p><strong>Email:</strong> ${params.get("email") || "N/A"}</p>
  <p><strong>Mobile Number:</strong> ${params.get("phone") || "N/A"}</p>
  <p><strong>Business Name:</strong> ${params.get("company") || "N/A"}</p>
  <p><strong>Submission Date:</strong> ${formattedDate}</p>
`;
