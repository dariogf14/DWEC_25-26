const lista = document.getElementById('listaTareas');
const boton = document.getElementById('addTarea');

boton.addEventListener('click', () => {
  const input = document.getElementById('tarea');
  if (input.value.trim() === '') return;

  const li = document.createElement('li');
  li.textContent = input.value + ' ';
  const btn = document.createElement('button');
  btn.textContent = 'Eliminar';
  li.appendChild(btn);

  lista.appendChild(li);
  input.value = '';
});

lista.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentNode.remove();
  }
});
