
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
} 
// Gnts
const nameInput = document.getElementById("name");
const rollInput = document.getElementById("roll");
const departmentInput = document.getElementById("department");
const yearInput = document.getElementById("year");
const mobileInput = document.getElementById("mobile");
const passwordInput = document.getElementById("password"); // ✅ NEW

const saveBtn = document.getElementById("saveBtn");
const updateBtn = document.getElementById("updateBtn");
const clearBtn = document.getElementById("clearBtn");

const studentTable = document.getElementById("studentTable");

let students = JSON.parse(localStorage.getItem("students")) || [];

let editIndex = -1;



function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}


function displayStudents() {

    studentTable.innerHTML = "";

    students.forEach((student, index) => {

        studentTable.innerHTML += `
        <tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.department}</td>
            <td>${student.year}</td>
            <td>${student.mobile}</td>
            <td>${student.password}</td> <!-- ✅ NEW -->
            <td>
                <button class="edit-btn" onclick="editStudent(${index})">
                    <i class="fa fa-edit"></i>
                </button>
            </td>
            <td>
                <button class="delete-btn" onclick="deleteStudent(${index})">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });
}

displayStudents();


function clearForm() {
    nameInput.value = "";
    rollInput.value = "";
    departmentInput.value = "";
    yearInput.value = "";
    mobileInput.value = "";
    passwordInput.value = ""; // ✅ NEW
    editIndex = -1;
}

clearBtn.addEventListener("click", clearForm);


saveBtn.addEventListener("click", function () {

    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    const department = departmentInput.value.trim();
    const year = yearInput.value;
    const mobile = mobileInput.value.trim();
    const password = passwordInput.value.trim(); // ✅ NEW

    if (
        name === "" ||
        roll === "" ||
        department === "" ||
        year === "" ||
        mobile === "" ||
        password === "" // ✅ NEW
    ) {
        alert("Please fill all fields.");
        return;
    }

    const exists = students.find(s => s.roll === roll);

    if (exists) {
        alert("Roll Number already exists!");
        return;
    }

    const student = {
        id: students.length + 1,
        name,
        roll,
        department,
        year,
        mobile,
        password // ✅ IMPORTANT FOR LOGIN
    };

    students.push(student);

    saveStudents();
    displayStudents();
    clearForm();

    alert("Student Added Successfully!");
});


function editStudent(index) {

    editIndex = index;

    const student = students[index];

    nameInput.value = student.name;
    rollInput.value = student.roll;
    departmentInput.value = student.department;
    yearInput.value = student.year;
    mobileInput.value = student.mobile;
    passwordInput.value = student.password; // ✅ NEW

    saveBtn.style.display = "none";
    updateBtn.style.display = "inline-block";

    window.scrollTo({ top: 0, behavior: "smooth" });
}



updateBtn.style.display = "none";

updateBtn.addEventListener("click", function () {

    if (editIndex === -1) {
        alert("Please select a student to update.");
        return;
    }

    const name = nameInput.value.trim();
    const roll = rollInput.value.trim();
    const department = departmentInput.value.trim();
    const year = yearInput.value;
    const mobile = mobileInput.value.trim();
    const password = passwordInput.value.trim(); // ✅ NEW

    if (
        name === "" ||
        roll === "" ||
        department === "" ||
        year === "" ||
        mobile === "" ||
        password === "" // ✅ NEW
    ) {
        alert("Please fill all fields.");
        return;
    }

    const duplicate = students.find((s, i) =>
        s.roll === roll && i !== editIndex
    );

    if (duplicate) {
        alert("Roll Number already exists!");
        return;
    }

    students[editIndex] = {
        id: students[editIndex].id,
        name,
        roll,
        department,
        year,
        mobile,
        password // ✅ KEEP UPDATED PASSWORD
    };

    saveStudents();
    displayStudents();
    clearForm();

    saveBtn.style.display = "inline-block";
    updateBtn.style.display = "none";

    alert("Student Updated Successfully!");
});



function deleteStudent(index) {

    if (!confirm("Are you sure you want to delete this student?")) return;

    students.splice(index, 1);

    students.forEach((s, i) => {
        s.id = i + 1;
    });

    saveStudents();
    displayStudents();

    alert("Student Deleted Successfully!");
}



document.getElementById("logoutBtn").addEventListener("click", function () {

    if (confirm("Do you want to Logout?")) {
        localStorage.removeItem("loggedIn");
        window.location.href = "index.html";
    }
});


document.getElementById("search").addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let rows = studentTable.getElementsByTagName("tr");

    for (let row of rows) {
        row.style.display =
            row.textContent.toLowerCase().includes(value)
                ? ""
                : "none";
    }
});



mobileInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
});

rollInput.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});

nameInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
});



document.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        event.preventDefault();

        if (updateBtn.style.display === "inline-block") {
            updateBtn.click();
        } else {
            saveBtn.click();
        }
    }
});



window.onload = function () {
    nameInput.focus();
};

function updateStudentCount() {
    console.log("Total Students:", students.length);
}

updateStudentCount();