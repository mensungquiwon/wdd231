const ratesBody = document.getElementById("ratesBody");

// Fetch USD-based exchange data
fetch("https://latest.currency-api.pages.dev/v1/currencies/usd.json")
  .then(response => response.json())
  .then(data => {
    ratesBody.innerHTML = "";

    const usdToLRD = 190;

    // Create table row
    const row = document.createElement("tr");

    const currencyCell = document.createElement("td");
    const rateCell = document.createElement("td");
    rateCell.textContent = `1 USD = ${usdToLRD.toFixed(2)} LRD`;

    row.appendChild(currencyCell);
    row.appendChild(rateCell);

    ratesBody.appendChild(row);
  })
  .catch(error => {
    console.error("API Error:", error);
    ratesBody.innerHTML =
      "<tr><td colspan='2'>Unable to load USD to LRD rate.</td></tr>";
  });
