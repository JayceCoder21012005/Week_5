let users = [];
let currentEditId = null;
let nextId = 1;

const loadFromLocalStorage = () => {
  const savedUsers = localStorage.getItem("registrationUsers");
  const savedNextId = localStorage.getItem("registrationNextId");

  if (savedUsers) {
    users = JSON.parse(savedUsers);
  } else {
    users = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
      },
      {
        id: 3,
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice.johnson@example.com",
      },
    ];
    nextId = 4;
    saveToLocalStorage();
  }

  if (savedNextId) {
    nextId = parseInt(savedNextId);
  }
}

const saveToLocalStorage = () => {
  localStorage.setItem("registrationUsers", JSON.stringify(users));
  localStorage.setItem("registrationNextId", nextId.toString());
}

const form = document.getElementById("registrationForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const registerBtn = document.getElementById("registerBtn");
const updateBtn = document.getElementById("updateBtn");
const tableBody = document.getElementById("userTableBody");

const renderTable = () => {
  tableBody.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.firstName} ${user.lastName}</td>
                    <td>${user.email}</td>
                    <td>
                        <div class="action_buttons">
                            <button class="btn_edit" onclick="editUser(${
                              user.id
                            })">Edit</button>
                            <button class="btn_delete" onclick="deleteUser(${
                              user.id
                            })">Delete</button>
                        </div>
                    </td>
                `;
    tableBody.appendChild(row);
  });
}

// Register new user
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();

  if (firstName && lastName && email) {
    users.push({
      id: nextId++,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    saveToLocalStorage();
    resetForm();
    renderTable();
  }
});

const editUser = (id) => {
  const user = users.find((u) => u.id === id);
  if (user) {
    currentEditId = id;
    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;
    emailInput.value = user.email;
  }
}

updateBtn.addEventListener("click", function () {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();

  if (firstName && lastName && email && currentEditId !== null) {
    const userIndex = users.findIndex((u) => u.id === currentEditId);
    if (userIndex !== -1) {
      users[userIndex] = {
        id: currentEditId,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };

      saveToLocalStorage();
      resetForm();
      renderTable();
    }
  }
});

const deleteUser = (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    users = users.filter((u) => u.id !== id);
    saveToLocalStorage();
    renderTable();
  }
}

const resetForm = () => {
  form.reset();
  currentEditId = null;
}

loadFromLocalStorage();
renderTable();
