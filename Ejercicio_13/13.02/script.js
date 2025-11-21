const API_URL = 'https://crudcrud.com/api/6338549b3b184270b861eb7664292c29';

const usersTableBody = document.querySelector('#usersTable tbody');
const userForm = document.getElementById('userForm');
const loadInitialUsersBtn = document.getElementById('loadInitialUsersBtn');
const messageDiv = document.getElementById('message');
const loadingDiv = document.getElementById('loading');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const searchInput = document.getElementById('searchInput');

let editingUserId = null;
let usersCache = [];

const initialUsers = [
    { firstName: "Alice", lastName: "Smith", email: "alice.smith@example.com", picture: "https://randomuser.me/api/portraits/women/1.jpg" },
    { firstName: "Bob", lastName: "Johnson", email: "bob.johnson@example.com", picture: "https://randomuser.me/api/portraits/men/2.jpg" },
    { firstName: "Charlie", lastName: "Brown", email: "charlie.brown@example.com", picture: "https://randomuser.me/api/portraits/men/3.jpg" },
    { firstName: "Diana", lastName: "Prince", email: "diana.prince@example.com", picture: "https://randomuser.me/api/portraits/women/4.jpg" },
    { firstName: "Eve", lastName: "Adams", email: "eve.adams@example.com", picture: "https://randomuser.me/api/portraits/women/5.jpg" }
];

function showMessage(msg, type='success') {
    messageDiv.textContent = msg;
    messageDiv.style.color = type === 'error' ? 'red' : 'green';
    setTimeout(() => { messageDiv.textContent = ''; }, 3000);
}

function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
    submitBtn.disabled = show;
    loadInitialUsersBtn.disabled = show;
}

function validateForm() {
    let valid = true;
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const picture = document.getElementById('picture');

    document.getElementById('firstNameError').textContent = '';
    document.getElementById('lastNameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('pictureError').textContent = '';

    if (!firstName.value.trim()) {
        document.getElementById('firstNameError').textContent = 'Nombre obligatorio';
        valid = false;
    }
    if (!lastName.value.trim()) {
        document.getElementById('lastNameError').textContent = 'Apellido obligatorio';
        valid = false;
    }
    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
        document.getElementById('emailError').textContent = 'Email inválido';
        valid = false;
    }
    if (!picture.value.match(/^https?:\/\/.+/)) {
        document.getElementById('pictureError').textContent = 'URL inválida';
        valid = false;
    }

    return valid;
}

async function fetchUsers() {
    try {
        showLoading(true);
        const res = await fetch(API_URL);
        const users = await res.json();
        usersCache = users;
        displayUsers(users);
    } catch (err) {
        showMessage('Error al cargar usuarios', 'error');
        console.error(err);
    } finally {
        showLoading(false);
    }
}

function displayUsers(users) {
    const filter = searchInput.value.toLowerCase();
    usersTableBody.innerHTML = '';
    users
        .filter(u => u.firstName.toLowerCase().includes(filter) || u.lastName.toLowerCase().includes(filter))
        .forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${user.picture}" alt="${user.firstName}"></td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-btn" data-id="${user._id}">Editar</button>
                    <button class="delete-btn" data-id="${user._id}">Eliminar</button>
                </td>
            `;
            usersTableBody.appendChild(tr);
        });
}

async function addUser(userData) {
    const tempId = 'temp-' + Date.now();
    const tempUser = {...userData, _id: tempId};
    usersCache.push(tempUser);
    displayUsers(usersCache);

    try {
        showLoading(true);
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        });
        const savedUser = await res.json();
        usersCache = usersCache.map(u => u._id === tempId ? savedUser : u);
        displayUsers(usersCache);
        showMessage('Usuario añadido correctamente');
    } catch (err) {
        usersCache = usersCache.filter(u => u._id !== tempId);
        displayUsers(usersCache);
        showMessage('Error al añadir usuario', 'error');
        console.error(err);
    } finally {
        showLoading(false);
    }
}

async function updateUser(id, userData) {
    const original = usersCache.find(u => u._id === id);
    usersCache = usersCache.map(u => u._id === id ? {...original, ...userData} : u);
    displayUsers(usersCache);

    try {
        showLoading(true);
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData)
        });
        showMessage('Usuario actualizado correctamente');
    } catch (err) {
        usersCache = usersCache.map(u => u._id === id ? original : u);
        displayUsers(usersCache);
        showMessage('Error al actualizar usuario', 'error');
        console.error(err);
    } finally {
        showLoading(false);
    }
}

async function deleteUser(id) {
    const original = [...usersCache];
    usersCache = usersCache.filter(u => u._id !== id);
    displayUsers(usersCache);

    try {
        showLoading(true);
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        showMessage('Usuario eliminado correctamente');
    } catch (err) {
        usersCache = original;
        displayUsers(usersCache);
        showMessage('Error al eliminar usuario', 'error');
        console.error(err);
    } finally {
        showLoading(false);
    }
}

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        picture: document.getElementById('picture').value.trim()
    };

    if (editingUserId) {
        await updateUser(editingUserId, userData);
        editingUserId = null;
        submitBtn.textContent = 'Añadir Usuario';
        cancelEditBtn.style.display = 'none';
    } else {
        await addUser(userData);
    }

    userForm.reset();
});

cancelEditBtn.addEventListener('click', () => {
    editingUserId = null;
    submitBtn.textContent = 'Añadir Usuario';
    cancelEditBtn.style.display = 'none';
    userForm.reset();
});

usersTableBody.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('edit-btn')) {
        const user = usersCache.find(u => u._id === id);
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('email').value = user.email;
        document.getElementById('picture').value = user.picture;
        editingUserId = id;
        submitBtn.textContent = 'Guardar Cambios';
        cancelEditBtn.style.display = 'inline';
    } else if (e.target.classList.contains('delete-btn')) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            await deleteUser(id);
        }
    }
});

loadInitialUsersBtn.addEventListener('click', async () => {
    for (const user of initialUsers) {
        await addUser(user);
    }
});

searchInput.addEventListener('input', () => displayUsers(usersCache));

fetchUsers();