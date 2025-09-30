// biblioteca.js

// 1. Definimos la colección de libros
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

// 2. Función para agregar un nuevo libro
function agregarLibro(nuevoLibro) {
  libros.push(nuevoLibro);
}

// 3. Función para obtener toda la colección
function obtenerLibros() {
  return libros;
}

// Exportamos funciones
module.exports = { agregarLibro, obtenerLibros };