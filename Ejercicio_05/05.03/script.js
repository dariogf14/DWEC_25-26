function generarInformeDeValidacion() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const informe = document.getElementById('informe-errores');
  informe.innerHTML = '';

  if (nombre.length <= 3) {
    const p = document.createElement('p');
    p.textContent = 'El nombre debe tener más de 3 caracteres.';
    informe.appendChild(p);
  }

  if (!email.includes('@')) {
    const p = document.createElement('p');
    p.textContent = 'El email debe contener "@".';
    informe.appendChild(p);
  }

  if (informe.children.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'Formulario válido.';
    informe.appendChild(p);
  }
}