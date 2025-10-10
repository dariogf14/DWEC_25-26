const usuarios = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Luis', edad: 30 },
  { nombre: 'María', edad: 22 }
];

function crearTabla(array) {
  const tabla = document.createElement('table');
  const fragment = document.createDocumentFragment();

  array.forEach(usuario => {
    const fila = document.createElement('tr');
    for (const valor of Object.values(usuario)) {
      const celda = document.createElement('td');
      celda.textContent = valor;
      fila.appendChild(celda);
    }
    fragment.appendChild(fila);
  });

  tabla.appendChild(fragment);
  document.getElementById('contenedor-tabla').appendChild(tabla);
}

crearTabla(usuarios);