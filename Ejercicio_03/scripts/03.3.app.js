import { obtenerLibros, agregarLibro } from "./03.3.biblioteca.js";

console.log(obtenerLibros());

agregarLibro(11, "Warbreaker", "Brandon Sanderson", 592);

console.log(obtenerLibros());