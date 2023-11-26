const topNav = document.getElementById("myTopnav", toggleNav);
const closeSpans = document.getElementsByClassName("close");
const modals = document.getElementsByClassName("modal");
const signUpDiv = document.getElementById("signup-form-div");
const signUpBtn = document.getElementById("signUp-btn");

const loginDiv = document.getElementById("login-form-div");
const loginBtn = document.getElementById("login-btn");

signUpBtn.addEventListener("click", () => {
    signUpDiv.style.display = "block";
});

for (let i = 0; i < closeSpans.length; i++) {
    closeSpans[i].addEventListener("click", () => {
        signUpDiv.style.display = "none";
        loginDiv.style.display = "none";
    });
}

loginBtn.addEventListener("click", ()=> {
    loginDiv.style.display = "block";
})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            signUpDiv.style.display = "none";
            loginDiv.style.display = "none";
        }
    }
};

function toggleNav() {
    if (topNav.classList.contains("responsive")) {
        topNav.classList.remove("responsive");
    } else {
        topNav.classList.add("responsive");
    }
}


