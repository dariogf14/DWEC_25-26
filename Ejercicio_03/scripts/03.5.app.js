// app.js

const { 
  agregarLibro, 
  obtenerLibros, 
  buscarLibro, 
  eliminarLibro, 
  calcularTotalPaginas 
} = require("./biblioteca");

// Mostrar colección inicial
console.log("📚 Colección inicial:");
console.log(obtenerLibros());

// Calcular total de páginas
const totalPaginas = calcularTotalPaginas();
console.log(`\n📖 El total de páginas en la biblioteca es: ${totalPaginas}`);