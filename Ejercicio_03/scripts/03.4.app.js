import { obtenerLibros, agregarLibro, buscarLibro, eliminarLibro } from "./03.4.biblioteca.js";

console.log(obtenerLibros());

agregarLibro(11, "Warbreaker", "Brandon Sanderson", 592);

console.log(buscarLibro(2));

eliminarLibro(2)

console.log(obtenerLibros());