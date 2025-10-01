const libros = [
  { id: 1, titulo: "Elantris", autor: "Brandon Sanderson", paginas: 638 },
  { id: 2, titulo: "Mistborn: El Imperio Final", autor: "Brandon Sanderson", paginas: 541 },
  { id: 3, titulo: "El Aliento de los Dioses", autor: "Brandon Sanderson", paginas: 672 },
  { id: 4, titulo: "El Camino de los Reyes", autor: "Brandon Sanderson", paginas: 1007 },
  { id: 5, titulo: "Palabras Radiantes", autor: "Brandon Sanderson", paginas: 1088 },
  { id: 6, titulo: "El Hobbit", autor: "J.R.R. Tolkien", paginas: 310 },
  { id: 7, titulo: "El Señor de los Anillos: La Comunidad del Anillo", autor: "J.R.R. Tolkien", paginas: 479 },
  { id: 8, titulo: "El Señor de los Anillos: Las Dos Torres", autor: "J.R.R. Tolkien", paginas: 415 },
  { id: 9, titulo: "El Señor de los Anillos: El Retorno del Rey", autor: "J.R.R. Tolkien", paginas: 416 },
  { id: 10, titulo: "El Silmarillion", autor: "J.R.R. Tolkien", paginas: 365 }
];

function agregarLibro(id, titulo, autor, paginas) {
  const nuevoLibro = { id, titulo, autor, paginas };
  libros.push(nuevoLibro);
}

function obtenerLibros() {
  return libros;
}

function buscarLibro(id) {
  return libros.find( libro => libro.id === id)
}

function eliminarLibro(id) {
  const index = libros.findIndex(libro => libro.id === id);
  if (index !== -1) {
    libros.splice(index, 1);
  }
}

function calcularTotalPaginas() {
  return libros.reduce((total, libro) => total + libro.paginas, 0);
}

function ordenarPorPaginas() {
    return [...libros].sort((a, b) => a.paginas - b.paginas);
}

export { obtenerLibros, agregarLibro, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas };