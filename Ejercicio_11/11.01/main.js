(function () {
  const DATA_FILE = 'user_data.json'; 
  const TARGET_POST_URL = 'https://webhook.site/'; // -> OJO: reemplaza por tu URL de webhook.site
  const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  const editBtn = document.getElementById('edit-btn');
  const saveBtn = document.getElementById('save-btn');
  const saveSpinner = document.getElementById('save-spinner');
  const saveText = document.getElementById('save-text');
  const alertArea = document.getElementById('alert-area');

  const fields = {
    userId: document.getElementById('user-id'),
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    street: document.getElementById('street'),
    city: document.getElementById('city'),
    zipCode: document.getElementById('zipCode'),
    country: document.getElementById('country'),
    theme: document.getElementById('theme'),
    notifications: document.getElementById('notifications'),
    language: document.getElementById('language'),
    hobbies: document.getElementById('hobbies')
  };

  let originalData = null;
  let isEditing = false;

  function showAlert(type, message, timeout = 5000) {
    alertArea.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
    alertArea.appendChild(wrapper);
    if (timeout) {
      setTimeout(() => {
        const alertEl = bootstrap.Alert.getOrCreateInstance(wrapper.querySelector('.alert'));
        try { alertEl.close(); } catch (e) {}
      }, timeout);
    }
  }

  function setFieldsEditable(enable) {
    Object.values(fields).forEach(el => {
      if (el && el.tagName) {
        if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
          el.disabled = !enable;
        }
      }
    });
    isEditing = enable;
    if (enable) {
      editBtn.classList.add('d-none');
      saveBtn.classList.remove('d-none');
    } else {
      editBtn.classList.remove('d-none');
      saveBtn.classList.add('d-none');
    }
  }

  function populateForm(data) {
    try {
      originalData = JSON.parse(JSON.stringify(data)); // clon
    } catch (e) {
      originalData = data;
    }
    fields.userId.value = data.id || '';
    const pi = data.personalInfo || {};
    fields.firstName.value = pi.firstName || '';
    fields.lastName.value = pi.lastName || '';
    fields.email.value = pi.email || '';
    fields.phone.value = pi.phone || '';

    const ad = data.address || {};
    fields.street.value = ad.street || '';
    fields.city.value = ad.city || '';
    fields.zipCode.value = ad.zipCode || '';
    fields.country.value = ad.country || '';

    const pref = data.preferences || {};
    fields.theme.value = pref.theme || '';
    fields.notifications.value = (pref.notifications ? 'true' : 'false');
    fields.language.value = pref.language || '';

    fields.hobbies.value = Array.isArray(data.hobbies) ? data.hobbies.join(', ') : (data.hobbies || '');
  }

  function buildDataFromForm() {
    return {
      id: fields.userId.value || '',
      personalInfo: {
        firstName: fields.firstName.value || '',
        lastName: fields.lastName.value || '',
        email: fields.email.value || '',
        phone: fields.phone.value || ''
      },
      address: {
        street: fields.street.value || '',
        city: fields.city.value || '',
        zipCode: fields.zipCode.value || '',
        country: fields.country.value || ''
      },
      preferences: {
        theme: fields.theme.value || '',
        notifications: fields.notifications.value === 'true' || fields.notifications.value === '1' || fields.notifications.value.toLowerCase() === 'on',
        language: fields.language.value || 'es'
      },
      hobbies: fields.hobbies.value ? fields.hobbies.value.split(',').map(h => h.trim()).filter(Boolean) : []
    };
  }

  function loadUserData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', DATA_FILE, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = xhr.response;
        populateForm(data);
        setFieldsEditable(false);
      } else {
        showAlert('danger', `Error cargando datos: ${xhr.status} ${xhr.statusText}`);
      }
    };
    xhr.onerror = function () {
      showAlert('danger', 'Error de red al cargar user_data.json.');
    };
    xhr.send();
  }

  function postUserData(data, callback) {
    const xhr = new XMLHttpRequest();
    const fullUrl = CORS_PROXY + TARGET_POST_URL;
    xhr.open('POST', fullUrl, true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(null, xhr);
      } else {
        callback(new Error(`Respuesta no OK: ${xhr.status} ${xhr.statusText}`), xhr);
      }
    };
    xhr.onerror = function () {
      callback(new Error('Error de red durante el POST'), xhr);
    };
    try {
      xhr.send(JSON.stringify(data));
    } catch (err) {
      callback(err);
    }
  }

  editBtn.addEventListener('click', function () {
    setFieldsEditable(true);
  });

  saveBtn.addEventListener('click', function () {
    const updated = buildDataFromForm();

    saveBtn.disabled = true;
    saveSpinner.classList.remove('d-none');
    saveText.innerText = 'Enviando...';

    postUserData(updated, function (err, res) {
      saveBtn.disabled = false;
      saveSpinner.classList.add('d-none');
      saveText.innerText = 'Guardar cambios';

      if (err) {
        console.error(err, res);
        showAlert('danger', 'Error al enviar los datos. Revisa la consola. Si usas cors-anywhere, asegúrate de activar el demo o usa otro proxy.');
      } else {
        showAlert('success', 'Datos guardados correctamente (respuesta del servidor positiva).', 4000);
        populateForm(updated);
        setFieldsEditable(false);
      }
    });
  });

  loadUserData();

})();