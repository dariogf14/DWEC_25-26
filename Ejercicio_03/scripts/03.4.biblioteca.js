// biblioteca.js

// Colección de libros inicial
const libros = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", paginas: 417 },
  { id: 2, titulo: "Don Quijote de la Mancha", autor: "Miguel de Cervantes", paginas: 863 },
  { id: 3, titulo: "1984", autor: "George Orwell", paginas: 328 },
  { id: 4, titulo: "El principito", autor: "Antoine de Saint-Exupéry", paginas: 96 },
  { id: 5, titulo: "Crimen y castigo", autor: "Fiódor Dostoyevski", paginas: 671 },
  { id: 6, titulo: "Orgullo y prejuicio", autor: "Jane Austen", paginas: 432 },
  { id: 7, titulo: "La Odisea", autor: "Homero", paginas: 541 },
  { id: 8, titulo: "Fahrenheit 451", autor: "Ray Bradbury", paginas: 256 },
  { id: 9, titulo: "Moby Dick", autor: "Herman Melville", paginas: 585 },
  { id: 10, titulo: "Hamlet", autor: "William Shakespeare", paginas: 342 }
];

// Agregar un nuevo libro
function agregarLibro(nuevoLibro) {
  libros.push(nuevoLibro);
}

// Obtener todos los libros
function obtenerLibros() {
  return libros;
}

// Buscar libro por ID
function buscarLibro(id) {
  return libros.find(libro => libro.id === id);
}

// Eliminar libro por ID
function eliminarLibro(id) {
  const indice = libros.findIndex(libro => libro.id === id);
  if (indice !== -1) {
    libros.splice(indice, 1);
    return true; // eliminado correctamente
  }
  return false; // no se encontró el libro
}

// Exportamos funciones
module.exports = { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro };