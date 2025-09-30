// app.js

// Importamos las funciones desde biblioteca.js
const { agregarLibro, obtenerLibros } = require("./biblioteca");

// Mostrar colección inicial
console.log("📚 Colección inicial:");
console.log(obtenerLibros());

// Agregar un nuevo libro
const nuevoLibro = {
  id: 11,
  titulo: "El Hobbit",
  autor: "J.R.R. Tolkien",
  paginas: 310
};

agregarLibro(nuevoLibro);

// Mostrar colección actualizada
console.log("\n📚 Colección después de agregar un nuevo libro:");
console.log(obtenerLibros());