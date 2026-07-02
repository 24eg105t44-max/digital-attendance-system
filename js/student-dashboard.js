document.addEventListener("DOMContentLoaded", function () {

    // Protect page (redirect if not logged in)
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "index.html";
        return;
    }

    // Get current student roll
    const roll = localStorage.getItem("studentRoll");

    // Load stored data
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    const notifications = JSON.parse(localStorage.getItem("notifications")) || {};

    // Find student
    const student = students.find(s => s.roll === roll);

    // Elements
    const nameEl = document.getElementById("studentName");
    const rollEl = document.getElementById("studentRoll");

    const presentEl = document.getElementById("presentDays");
    const absentEl = document.getElementById("absentDays");
    const percentEl = document.getElementById("percentage");

    const historyTable = document.getElementById("historyTable");
    const notificationTable = document.getElementById("notificationTable");

    // ---------------- PROFILE ----------------
    if (student) {
        nameEl.textContent = student.name;
        rollEl.textContent = "Roll: " + student.roll;
    } else {
        nameEl.textContent = "Unknown Student";
        rollEl.textContent = "N/A";
    }

    // ---------------- ATTENDANCE ----------------
    const studentAttendance = attendance.filter(a => a.roll === roll);

    let presentCount = 0;
    let absentCount = 0;

    studentAttendance.forEach(record => {

        if (record.status === "Present") presentCount++;
        else absentCount++;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.status}</td>
        `;
        historyTable.appendChild(row);
    });

    // Percentage
    const total = presentCount + absentCount;
    const percentage = total === 0 ? 0 : ((presentCount / total) * 100).toFixed(2);

    presentEl.textContent = presentCount;
    absentEl.textContent = absentCount;
    percentEl.textContent = percentage + "%";

    // ---------------- NOTIFICATIONS ----------------
    const studentNotifications = notifications[roll] || [];

    studentNotifications.forEach(note => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${note.message}</td>
            <td>${note.date}</td>
        `;
        notificationTable.appendChild(row);
    });

    // ---------------- LOGOUT ----------------
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("studentRoll");
        window.location.href = "index.html";
    });

    // ---------------- LIVE CLOCK ----------------
    function updateDateTime() {
        const now = new Date();

        const dateEl = document.getElementById("currentDate");
        const timeEl = document.getElementById("currentTime");

        if (dateEl && timeEl) {
            dateEl.textContent = now.toLocaleDateString();
            timeEl.textContent = now.toLocaleTimeString();
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

});