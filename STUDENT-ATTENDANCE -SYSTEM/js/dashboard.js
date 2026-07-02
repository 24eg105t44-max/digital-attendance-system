// ======================================
// Student Attendance Management System
// Dashboard JavaScript
// ======================================

// ----------------------------
// CHECK LOGIN
// ----------------------------

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// ----------------------------
// DISPLAY ADMIN NAME
// ----------------------------

const adminName = document.getElementById("adminName");

if (adminName) {
    adminName.innerText =
        localStorage.getItem("username") || "Admin";
}

// ----------------------------
// LOAD STUDENTS
// ----------------------------

let students =
    JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("totalStudents").innerText =
    students.length;

// ----------------------------
// LOAD ATTENDANCE
// ----------------------------

let attendance =
    JSON.parse(localStorage.getItem("attendance")) || [];

let present = 0;
let absent = 0;

// Latest attendance only
if (attendance.length > 0) {

    let latest = attendance[attendance.length - 1];

    present = latest.present.length;
    absent = latest.absent.length;
}

document.getElementById("presentStudents").innerText = present;
document.getElementById("absentStudents").innerText = absent;

// ----------------------------
// ATTENDANCE PERCENTAGE
// ----------------------------

let percentage = 0;

if (students.length > 0) {

    percentage =
        Math.round((present / students.length) * 100);

}

document.getElementById("attendancePercentage").innerText =
    percentage + "%";

// ----------------------------
// DATE & TIME
// ----------------------------

function updateDateTime() {

    const now = new Date();

    document.getElementById("currentDate").innerHTML =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    document.getElementById("currentTime").innerHTML =
        now.toLocaleTimeString();

}

updateDateTime();

setInterval(updateDateTime, 1000);

// ----------------------------
// LOGOUT
// ----------------------------

document
.getElementById("logoutBtn")
.addEventListener("click", function () {

    let confirmLogout =
        confirm("Are you sure you want to logout?");

    if (confirmLogout) {

        localStorage.removeItem("loggedIn");

        window.location.href = "index.html";
    }

});

// ----------------------------
// SAMPLE DATA
// (Only runs first time)
// ----------------------------

if (students.length === 0) {

    students = [

        {
            id:1,
            name:"Rahul Kumar",
            roll:"23CSE001",
            department:"CSE",
            year:"III"
        },

        {
            id:2,
            name:"Anjali",
            roll:"23CSE002",
            department:"CSE",
            year:"III"
        },

        {
            id:3,
            name:"Kiran",
            roll:"23CSE003",
            department:"CSE",
            year:"III"
        }

    ];

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    document.getElementById("totalStudents").innerText =
        students.length;
}