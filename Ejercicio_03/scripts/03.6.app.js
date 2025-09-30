// app.js

const { 
  obtenerLibros, 
  ordenarPorPaginas 
} = require("./biblioteca");

// Mostrar colección original
console.log("📚 Colección original:");
console.log(obtenerLibros());

// Ordenar por páginas
ordenarPorPaginas();

console.log("\n📚 Colección ordenada por número de páginas:");
console.log(obtenerLibros());