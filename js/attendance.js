if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Do you want to logout?")) {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
    }

});

const attendanceTable = document.getElementById("attendanceTable");
const attendanceDate = document.getElementById("attendanceDate");
const saveAttendanceBtn = document.getElementById("saveAttendance");

attendanceDate.value = new Date().toISOString().split("T")[0];

let students = JSON.parse(localStorage.getItem("students")) || [];
let attendanceStatus = {};

function addNotification(roll, message) {

    let notifications = JSON.parse(localStorage.getItem("notifications")) || {};

    if (!notifications[roll]) {
        notifications[roll] = [];
    }

    notifications[roll].push({
        message: message,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("notifications", JSON.stringify(notifications));
}

function loadStudents() {

    attendanceTable.innerHTML = "";

    if (students.length === 0) {
        attendanceTable.innerHTML = `<tr><td colspan="6">No Students Found</td></tr>`;
        return;
    }

    students.forEach(student => {

        attendanceStatus[student.roll] = "Present";

        attendanceTable.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>
                <button class="present-btn active" onclick="markPresent('${student.roll}',this)">Present</button>
                <button class="absent-btn" onclick="markAbsent('${student.roll}',this)">Absent</button>
            </td>
        </tr>`;
    });

}

loadStudents();

function markPresent(roll, button) {

    attendanceStatus[roll] = "Present";

    const row = button.parentElement;

    row.querySelector(".present-btn").classList.add("active");
    row.querySelector(".absent-btn").classList.remove("active");

}

function markAbsent(roll, button) {

    attendanceStatus[roll] = "Absent";

    const row = button.parentElement;

    row.querySelector(".absent-btn").classList.add("active");
    row.querySelector(".present-btn").classList.remove("active");

}

saveAttendanceBtn.addEventListener("click", function () {

    const selectedDate = attendanceDate.value;

    if (selectedDate === "") {
        alert("Please select a date.");
        return;
    }

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    const alreadySaved = attendance.find(record => record.date === selectedDate);

    if (alreadySaved) {
        alert("Attendance for this date has already been saved.");
        return;
    }

    let present = [];
    let absent = [];

    students.forEach(student => {

        if (attendanceStatus[student.roll] === "Present") {

            present.push(student.roll);

            addNotification(student.roll,
                `You were marked PRESENT on ${selectedDate}`
            );

        } else {

            absent.push(student.roll);

            addNotification(student.roll,
                `You were marked ABSENT on ${selectedDate}`
            );

        }

    });

    attendance.push({
        date: selectedDate,
        present,
        absent
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    alert("Attendance Saved Successfully!");

});

attendanceDate.addEventListener("change", function () {

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    const record = attendance.find(item => item.date === this.value);

    if (!record) {
        loadStudents();
        return;
    }

    attendanceStatus = {};

    record.present.forEach(roll => {
        attendanceStatus[roll] = "Present";
    });

    record.absent.forEach(roll => {
        attendanceStatus[roll] = "Absent";
    });

    attendanceTable.innerHTML = "";

    students.forEach(student => {

        const status = attendanceStatus[student.roll] || "Present";

        attendanceTable.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>
                <button class="present-btn ${status === "Present" ? "active" : ""}" onclick="markPresent('${student.roll}',this)">Present</button>
                <button class="absent-btn ${status === "Absent" ? "active" : ""}" onclick="markAbsent('${student.roll}',this)">Absent</button>
            </td>
        </tr>`;
    });

});