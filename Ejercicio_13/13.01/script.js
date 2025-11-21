const API_URL = 'https://crudcrud.com/api/6338549b3b184270b861eb7664292c29';

const usersTableBody = document.querySelector('#usersTable tbody');
const userForm = document.getElementById('userForm');
const loadInitialUsersBtn = document.getElementById('loadInitialUsersBtn');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');

let editingUserId = null;

const initialUsers = [
    { "firstName": "Alice", "lastName": "Smith", "email": "alice.smith@example.com", "picture": "https://randomuser.me/api/portraits/women/1.jpg" },
    { "firstName": "Bob", "lastName": "Johnson", "email": "bob.johnson@example.com", "picture": "https://randomuser.me/api/portraits/men/2.jpg" },
    { "firstName": "Charlie", "lastName": "Brown", "email": "charlie.brown@example.com", "picture": "https://randomuser.me/api/portraits/men/3.jpg" },
    { "firstName": "Diana", "lastName": "Prince", "email": "diana.prince@example.com", "picture": "https://randomuser.me/api/portraits/women/4.jpg" },
    { "firstName": "Eve", "lastName": "Adams", "email": "eve.adams@example.com", "picture": "https://randomuser.me/api/portraits/women/5.jpg" },
    { "firstName": "Frank", "lastName": "White", "email": "frank.white@example.com", "picture": "https://randomuser.me/api/portraits/men/6.jpg" },
    { "firstName": "Grace", "lastName": "Taylor", "email": "grace.taylor@example.com", "picture": "https://randomuser.me/api/portraits/women/7.jpg" },
    { "firstName": "Henry", "lastName": "Moore", "email": "henry.moore@example.com", "picture": "https://randomuser.me/api/portraits/men/8.jpg" },
    { "firstName": "Ivy", "lastName": "Clark", "email": "ivy.clark@example.com", "picture": "https://randomuser.me/api/portraits/women/9.jpg" },
    { "firstName": "Jack", "lastName": "Lewis", "email": "jack.lewis@example.com", "picture": "https://randomuser.me/api/portraits/men/10.jpg" }
];

function uploadInitialUsers(users) {
    users.forEach(user => {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(() => {
            displayUsers();
        })
        .catch(err => {
            messageDiv.textContent = 'Error al cargar usuarios iniciales.';
            console.error(err);
        });
    });
}

function displayUsers() {
    fetch(API_URL)
    .then(res => res.json())
    .then(users => {
        usersTableBody.innerHTML = '';
        users.forEach(user => {
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
    })
    .catch(err => {
        messageDiv.textContent = 'Error al cargar usuarios.';
        console.error(err);
    });
}

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        picture: document.getElementById('picture').value
    };

    if (editingUserId) {
        fetch(`${API_URL}/${editingUserId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(() => {
            editingUserId = null;
            submitBtn.textContent = 'Añadir Usuario';
            cancelEditBtn.style.display = 'none';
            userForm.reset();
            displayUsers();
        })
        .catch(err => {
            messageDiv.textContent = 'Error al actualizar usuario.';
            console.error(err);
        });
    } else {
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        .then(() => {
            userForm.reset();
            displayUsers();
        })
        .catch(err => {
            messageDiv.textContent = 'Error al añadir usuario.';
            console.error(err);
        });
    }
});

usersTableBody.addEventListener('click', (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('edit-btn')) {
        fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(user => {
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById('picture').value = user.picture;
            editingUserId = id;
            submitBtn.textContent = 'Guardar Cambios';
            cancelEditBtn.style.display = 'inline';
        })
        .catch(err => {
            messageDiv.textContent = 'Error al cargar datos del usuario.';
            console.error(err);
        });
    } else if (e.target.classList.contains('delete-btn')) {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(() => displayUsers())
            .catch(err => {
                messageDiv.textContent = 'Error al eliminar usuario.';
                console.error(err);
            });
        }
    }
});

cancelEditBtn.addEventListener('click', () => {
    editingUserId = null;
    submitBtn.textContent = 'Añadir Usuario';
    cancelEditBtn.style.display = 'none';
    userForm.reset();
});

loadInitialUsersBtn.addEventListener('click', () => uploadInitialUsers(initialUsers));

displayUsers();