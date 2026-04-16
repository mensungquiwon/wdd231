const signUpBtn = document.querySelector("#signUpBtn");
const dashboardContent = document.querySelector("#dashboardContent");
const hamBtn = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const openAuthDialog = document.querySelector("#openAuthDialog");
const authDialog = document.querySelector("#authDialog");
const signInBtn = document.querySelector("#signInBtn");

if (hamBtn && navBar) {
    hamBtn.addEventListener("click", () => {
        hamBtn.classList.toggle("show");
        navBar.classList.toggle("show");
    });
}

// Open dialog - Added null check
if (openAuthDialog && authDialog) {
    openAuthDialog.addEventListener("click", () => {
        authDialog.showModal();
    });
}

// Sign in → show dashboard - Added null check
if (signInBtn && dashboardContent && openAuthDialog && authDialog) {
    signInBtn.addEventListener("click", () => {
        dashboardContent.hidden = false;
        openAuthDialog.hidden = true;
        authDialog.close();
    });
}

// Sign up → redirect to loan page - Added null check
if (signUpBtn) {
    signUpBtn.addEventListener("click", () => {
        window.location.href = "about.html";
    });
}