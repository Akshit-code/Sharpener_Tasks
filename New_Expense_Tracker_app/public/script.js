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
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById("login-password");

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
        lastName: lastNaame.value,
        email: email.value,
        password: newPassword.value
    }
    console.log(user);
    registerUser(user);
});

loginForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const user = {
        email : loginEmail.value,
        password: loginPassword.value
    };
    loginUser(user);
});


async function registerUser(user)  {
    try {
        const response = await fetch(`http://localhost:3000/user/register`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {
                firstName : user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                requestType: 'signUp'
            }),
        });

        if(response.status == 201) {
            console.log("New User Added");
            signUpDiv.style.display = "none";
            loginDiv.style.display = "block";
        } else if (response.status == 200){
            console.log("user Already exits");
            alert("User with same email id already Exits !!!");
        }
    } catch (error) {
        console.log(error);
    }
}
async function loginUser(user) {
    try {
        const response = await fetch(`http://localhost:3000/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password,
                requestType: 'login'
            }),
        });

        if (response.status === 200) {
            const data = await response.json();
            // After redirecting, you might not need further code execution here
        } else if (response.status === 401) {
            const error = await response.json();
            console.log(error);
            alert("Incorrect Password");
        } else if (response.status === 404) {
            const error = await response.json();
            console.log(error);
            alert("No user Found");
        }

        // Code to execute after handling the response
        loginDiv.style.display = "none";
        const expenseForm = document.getElementById("expense-form-section");
        expenseForm.style.display = "block";
    } catch (error) {
        console.log(error);
    }
}



