// app.js

const { agregarLibro, obtenerLibros, buscarLibro, eliminarLibro } = require("./biblioteca");

// Mostrar colección inicial
console.log("📚 Colección inicial:");
console.log(obtenerLibros());

// Buscar un libro por ID
const idBuscar = 3;
const libroEncontrado = buscarLibro(idBuscar);
console.log(`\n🔎 Buscando el libro con id = ${idBuscar}:`);
console.log(libroEncontrado);

// Eliminar un libro
const idEliminar = 5;
const eliminado = eliminarLibro(idEliminar);

console.log(`\n🗑 Intentando eliminar el libro con id = ${idEliminar}...`);
console.log(eliminado ? "✅ Libro eliminado con éxito" : "❌ No se encontró el libro");

// Mostrar colección final
console.log("\n📚 Colección final después de eliminar:");
console.log(obtenerLibros());