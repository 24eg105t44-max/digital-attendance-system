// ======================================
// Student Attendance Management System
// Login System (Admin + Student)
// ======================================

// Admin Credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// Get Elements
const loginForm = document.getElementById("loginForm");
const loginType = document.getElementById("loginType");
const username = document.getElementById("username");
const password = document.getElementById("password");
const error = document.getElementById("error");
const togglePassword = document.getElementById("togglePassword");

// ======================================
// LOGIN
// ======================================

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const role = loginType.value;
    const user = username.value.trim();
    const pass = password.value.trim();

    // ------------------------
    // ADMIN LOGIN
    // ------------------------

    if (role === "admin") {

        if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {

            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userRole", "admin");
            localStorage.setItem("username", user);

            error.style.color = "lightgreen";
            error.innerHTML = "✔ Admin Login Successful";

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1000);

        } else {

            error.style.color = "#ff8080";
            error.innerHTML = "❌ Invalid Admin Username or Password";

        }

    }

    // ------------------------
    // STUDENT LOGIN
    // ------------------------

    else {

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

            setTimeout(() => {

                window.location.href = "student-dashboard.html";

            }, 1000);

        } else {

            error.style.color = "#ff8080";
            error.innerHTML = "❌ Invalid Roll Number or Password";

        }

    }

});

// ======================================
// SHOW / HIDE PASSWORD
// ======================================

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

// ======================================
// CHANGE PLACEHOLDER
// ======================================

loginType.addEventListener("change", function () {

    if (this.value === "admin") {

        username.placeholder = "Enter Admin Username";

    } else {

        username.placeholder = "Enter Roll Number";

    }

});

// ======================================
// AUTO FOCUS
// ======================================

window.onload = function () {

    username.focus();

};

// ======================================
// ENTER KEY SUPPORT
// ======================================

document.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        loginForm.dispatchEvent(new Event("submit"));

    }

});