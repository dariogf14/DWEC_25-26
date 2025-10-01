import { obtenerLibros, agregarLibro, buscarLibro, eliminarLibro, calcularTotalPaginas } from "./03.5.biblioteca.js";

console.log(obtenerLibros());

agregarLibro(11, "Warbreaker", "Brandon Sanderson", 592);

console.log(buscarLibro(2));

eliminarLibro(2)

console.log(obtenerLibros());

console.log("Páginas totales:", calcularTotalPaginas())