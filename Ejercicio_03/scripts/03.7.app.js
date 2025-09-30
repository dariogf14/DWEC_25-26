// app.js

const { 
  obtenerLibros, 
  hayLibrosLargos, 
  todosSonLibrosCortos 
} = require("./biblioteca");

// Mostrar colección
console.log("📚 Colección de libros:");
console.log(obtenerLibros());

// Probar hayLibrosLargos
console.log("\n🔎 ¿Hay libros con más de 500 páginas?");
console.log(hayLibrosLargos(500)); // true

console.log("\n🔎 ¿Hay libros con más de 900 páginas?");
console.log(hayLibrosLargos(900)); // false

// Probar todosSonLibrosCortos
console.log("\n📏 ¿Todos los libros tienen menos de 1000 páginas?");
console.log(todosSonLibrosCortos(1000)); // true

console.log("\n📏 ¿Todos los libros tienen menos de 400 páginas?");
console.log(todosSonLibrosCortos(400)); // false