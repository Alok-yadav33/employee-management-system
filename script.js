let employees = [];
let editIndex = null;

const form = document.getElementById('employee-form');
const nameInput = document.getElementById('name');
const departmentInput = document.getElementById('department');
const salaryInput = document.getElementById('salary');
const tableBody = document.getElementById('employee-table');
const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');

function renderTable() {
    tableBody.innerHTML = '';
    employees.forEach((emp, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>
                <button onclick="editEmployee(${idx})">Edit</button>
                <button onclick="deleteEmployee(${idx})" style="background:#c0392b;">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (editIndex === null) {
        employees.push({
            name: nameInput.value,
            department: departmentInput.value,
            salary: salaryInput.value
        });
    } else {
        employees[editIndex] = {
            name: nameInput.value,
            department: departmentInput.value,
            salary: salaryInput.value
        };
        editIndex = null;
        addBtn.style.display = 'inline-block';
        updateBtn.style.display = 'none';
    }
    form.reset();
    renderTable();
});

window.editEmployee = function(idx) {
    const emp = employees[idx];
    nameInput.value = emp.name;
    departmentInput.value = emp.department;
    salaryInput.value = emp.salary;
    editIndex = idx;
    addBtn.style.display = 'none';
    updateBtn.style.display = 'inline-block';
};

window.deleteEmployee = function(idx) {
    if (confirm('Are you sure you want to delete this employee?')) {
        employees.splice(idx, 1);
        renderTable();
        form.reset();
        addBtn.style.display = 'inline-block';
        updateBtn.style.display = 'none';
        editIndex = null;
    }
};

updateBtn.addEventListener('click', function() {
    form.dispatchEvent(new Event('submit'));
});

renderTable();
