document.addEventListener('DOMContentLoaded', () => {
    const seccionForm = document.querySelector('#formulario-seccion');
    if (!seccionForm) return;
    const textarea = seccionForm.querySelector('textarea');
    if (textarea) {
      textarea.placeholder = 'Escribe aquí tu consulta detallada';
    }
});  