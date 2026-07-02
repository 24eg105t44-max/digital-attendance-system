const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

const loginForm = document.getElementById("loginForm");
const loginType = document.getElementById("loginType");
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("error");
const togglePassword = document.getElementById("togglePassword");

const signupBtn = document.getElementById("signupBtn");
const forgotPassword = document.getElementById("forgotPassword");

function updateDateTime() {
    const now = new Date();

    const dateOptions = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const date = document.getElementById("currentDate");
    const time = document.getElementById("currentTime");

    if (date) {
        date.innerHTML = now.toLocaleDateString("en-IN", dateOptions);
    }

    if (time) {
        time.innerHTML = now.toLocaleTimeString("en-IN");
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const role = loginType.value;
    const user = username.value.trim();
    const pass = password.value.trim();

    if (user === "" || pass === "") {

        error.style.color = "#ff8080";
        error.innerHTML = "Please enter username and password.";
        return;
    }

    if (role === "admin") {

        if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userRole", "admin");
            localStorage.setItem("username", user);

            error.style.color = "lightgreen";
            error.innerHTML = "✔ Admin Login Successful";

            setTimeout(function () {

                window.location.href = "dashboard.html";

            }, 1000);

        } else {

            error.style.color = "#ff8080";
            error.innerHTML = "❌ Invalid Admin Username or Password";

        }

    } else {

        let students = JSON.parse(localStorage.getItem("students")) || [];

        let student = students.find(function (s) {

            return s.roll === user && s.password === pass;

        });

        if (student) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userRole", "student");
            localStorage.setItem("studentRoll", student.roll);
            localStorage.setItem("studentName", student.name);

            error.style.color = "lightgreen";
            error.innerHTML = "✔ Student Login Successful";

            setTimeout(function () {

                window.location.href = "student-dashboard.html";

            }, 1000);

        } else {

            error.style.color = "#ff8080";
            error.innerHTML = "❌ Invalid Roll Number or Password";

        }

    }

});

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye-slash"></i>';

    } else {

        password.type = "password";

        togglePassword.innerHTML =
            '<i class="fa-solid fa-eye"></i>';

    }

});

loginType.addEventListener("change", function () {

    if (this.value === "admin") {

        username.placeholder = "Enter Admin Username";

    } else {

        username.placeholder = "Enter Roll Number";

    }

});

if (signupBtn) {

    signupBtn.addEventListener("click", function () {

        window.location.href = "signup.html";

    });

}

if (forgotPassword) {

    forgotPassword.addEventListener("click", function (e) {

        e.preventDefault();

        alert("Forgot Password feature will be added in the next update.");

    });

}

window.onload = function () {

    username.focus();
    updateDateTime();

};

document.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        loginForm.dispatchEvent(new Event("submit"));

    }

});