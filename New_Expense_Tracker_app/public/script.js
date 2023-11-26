const topNav = document.getElementById("myTopnav", toggleNav);
const closeSpans = document.getElementsByClassName("close");
const modals = document.getElementsByClassName("modal");

const signUpDiv = document.getElementById("signup-form-div");
const signUpBtn = document.getElementById("signUp-btn");
const signUpSubmitBtn = document.getElementById("signUp-Submit-Btn");
const signUpForm = document.getElementById("signup-form");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");
const firstName = document.getElementById("firstName");
const lastNaame = document.getElementById("lastName");
const email = document.getElementById("email");

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

function signUpFormValidation() {
    if ( newPassword.value.trim() != '' && confirmPassword.value.trim() != '' && newPassword.value === confirmPassword.value ) {
        signUpSubmitBtn.disabled = false;
    } else {
        signUpSubmitBtn.disabled = true;
    }
}

newPassword.addEventListener("input", signUpFormValidation);
confirmPassword.addEventListener("input", signUpFormValidation);

signUpForm.addEventListener("submit" , (e)=> {
    e.preventDefault();
    const user = {
        firstName: firstName.value,
        lastNaame: lastNaame.value,
        email: email.value,
        pasword: newPassword.value
    }
    console.log(user);
    addUser(user);
});


async function addUser(user)  {
    const response = await fetch(`http://localhost:3000/user`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            firstName : user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password
        }),
    })
    .then( res=>{
        return res.json();
    })
    .then( data => {
        console.log(data);
    })
}
