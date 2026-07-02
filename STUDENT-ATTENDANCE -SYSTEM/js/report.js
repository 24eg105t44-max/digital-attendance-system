// ======================================
// Student Attendance Management System
// report.js
// ======================================

// ----------------------------
// LOGIN CHECK
// ----------------------------

if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// ----------------------------
// LOGOUT
// ----------------------------

document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Do you want to logout?")) {

        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";

    }

});

// ----------------------------
// LOAD DATA
// ----------------------------

const students = JSON.parse(localStorage.getItem("students")) || [];
const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

const reportTable = document.getElementById("reportTable");

// ----------------------------
// GENERATE REPORT
// ----------------------------

function generateReport() {

    reportTable.innerHTML = "";

    const totalDays = attendance.length;

    students.forEach(student => {

        let present = 0;

        attendance.forEach(record => {

            if (record.present.includes(student.roll)) {

                present++;

            }

        });

        const absent = totalDays - present;

        const percentage = totalDays === 0
            ? 0
            : Math.round((present / totalDays) * 100);

        const status = percentage >= 75
            ? '<span class="status-pass">Eligible</span>'
            : '<span class="status-fail">Short Attendance</span>';

        reportTable.innerHTML += `

        <tr>

            <td>${student.id}</td>

            <td>${student.name}</td>

            <td>${student.roll}</td>

            <td>${student.department}</td>

            <td>${present}</td>

            <td>${absent}</td>

            <td>${percentage}%</td>

            <td>${status}</td>

        </tr>

        `;

    });

}

generateReport();

// ----------------------------
// SEARCH STUDENT
// ----------------------------

document.getElementById("searchStudent")
.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let rows = reportTable.getElementsByTagName("tr");

    for (let row of rows) {

        if (row.textContent.toLowerCase().includes(value)) {

            row.style.display = "";

        } else {

            row.style.display = "none";

        }

    }

});

// ----------------------------
// PRINT REPORT
// ----------------------------

document.getElementById("printBtn")
.addEventListener("click", function () {

    window.print();

});

// ----------------------------
// EXPORT CSV
// ----------------------------

document.getElementById("exportBtn")
.addEventListener("click", function () {

    let csv =
"ID,Name,Roll No,Department,Present,Absent,Attendance %,Status\n";

    const rows = reportTable.querySelectorAll("tr");

    rows.forEach(row => {

        const cols = row.querySelectorAll("td");

        if (cols.length > 0) {

            csv +=

`${cols[0].innerText},
${cols[1].innerText},
${cols[2].innerText},
${cols[3].innerText},
${cols[4].innerText},
${cols[5].innerText},
${cols[6].innerText},
${cols[7].innerText}\n`;

        }

    });

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "Attendance_Report.csv";

    a.click();

    URL.revokeObjectURL(url);

});