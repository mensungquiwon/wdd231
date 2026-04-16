const loanList = document.querySelector("#loanList");
// Get URL parameters
const params = new URLSearchParams(window.location.search);

// Only run if the page has query parameters
if (params.toString() !== "") {
  const loan = {
    first: params.get("first"),
    last: params.get("last"),
    company: params.get("company"),
    email: params.get("email"),
    phone: params.get("phone"),
    amount: params.get("amount"),
    date: params.get("dateNeeded"),
    period: params.get("period"),
    status: "Pending"
  };

  // Get existing loans or start new array
  let loans = JSON.parse(localStorage.getItem("loans")) || [];

  // Avoid duplicate storage on refresh
  const alreadyStored = loans.some(
    l =>
      l.first === loan.first &&
      l.last === loan.last &&
      l.amount === loan.amount &&
      l.date === loan.date
  );

  if (!alreadyStored) {
    loans.push(loan);
    localStorage.setItem("loans", JSON.stringify(loans));
  }

  // Remove query string after storing
  window.history.replaceState({}, document.title, window.location.pathname);
}

// Display loans from LocalStorage
function displayLoans() {
  const loans = JSON.parse(localStorage.getItem("loans")) || [];
  loanList.innerHTML = "";

  loans.forEach((loan) => {
    const card = document.createElement("div");
    card.classList.add("loan-card");

    card.innerHTML = `
      <p><strong>Name:</strong> ${loan.first} ${loan.last}</p>
      <p><strong>Business:</strong> ${loan.company}</p>
      <p><strong>Email:</strong> ${loan.email}</p>
      <p><strong>Phone:</strong> ${loan.phone}</p>
      <p><strong>Amount:</strong> $${loan.amount}</p>
      <p><strong>Date Needed:</strong> ${loan.date}</p>
      <p><strong>Repayment Period:</strong> ${loan.period} months</p>
      <p><strong>Status:</strong> ${loan.status}</p>
      <hr>
    `;

    loanList.appendChild(card);
  });
}

displayLoans();

const callButton = document.querySelector("#cta-btn")
callButton.addEventListener("click", () => {
  window.location.href = "loans.html";
});
