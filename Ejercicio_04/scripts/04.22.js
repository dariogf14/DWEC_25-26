const formulario = document.getElementById('formulario-contacto');
formulario.addEventListener('submit', function(event) {
event.preventDefault();
const mensaje = document.getElementById('mensaje').value;
console.log('Nombre:', nombre, 'Mensaje:', mensaje);
});