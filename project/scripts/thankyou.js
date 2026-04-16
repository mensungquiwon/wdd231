
const resultsBody = document.getElementById("resultsBody");
const urlParams = new URLSearchParams(window.location.search);

// Get existing loans
let loans = JSON.parse(localStorage.getItem("loans")) || [];

// ✅ Read data from URL and store in LocalStorage
if (urlParams.toString() !== "") {
  const loan = {
    first: urlParams.get("first"),
    last: urlParams.get("last"),
    company: urlParams.get("company"),
    email: urlParams.get("email"),
    phone: urlParams.get("phone"),
    amount: urlParams.get("amount"),
    date: urlParams.get("dateNeeded"),
    period: urlParams.get("period"),
    status: "Pending"
  };

  // Prevent duplicates on refresh
  const exists = loans.some(
    l =>
      l.first === loan.first &&
      l.last === loan.last &&
      l.amount === loan.amount &&
      l.date === loan.date
  );

  if (!exists) {
    loans.push(loan);
    localStorage.setItem("loans", JSON.stringify(loans));
  }

  // Clean the URL
  window.history.replaceState({}, document.title, window.location.pathname);
}

// ✅ Display loans in TABLE
function displayLoans() {
  resultsBody.innerHTML = "";

  if (loans.length === 0) {
    resultsBody.innerHTML = `
      <tr>
        <td colspan="8">No loan information found.</td>
      </tr>
    `;
    return;
  }

  loans.forEach((loan) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${loan.first} ${loan.last}</td>
      <td>${loan.company}</td>
      <td>${loan.email}</td>
      <td>${loan.phone}</td>
      <td>$${loan.amount}</td>
      <td>${loan.date}</td>
      <td>${loan.period} months</td>
      <td>${loan.status}</td>
    `;

    resultsBody.appendChild(row);
  });
}

// Run on page load
displayLoans();