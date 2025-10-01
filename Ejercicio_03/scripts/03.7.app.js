import { obtenerLibros, agregarLibro, buscarLibro, eliminarLibro, calcularTotalPaginas, ordenarPorPaginas, hayLibrosLargos, todosSonLibrosCortos } from "./03.7.biblioteca.js";

console.log(obtenerLibros());

agregarLibro(11, "Warbreaker", "Brandon Sanderson", 592);

console.log(buscarLibro(2));

eliminarLibro(2)

console.log(obtenerLibros());

console.log("Páginas totales:", calcularTotalPaginas())

console.log(ordenarPorPaginas())

console.log("¿Hay libros de más de 700 páginas?", hayLibrosLargos(700));

console.log("¿Todos los libros tienen menos de 1500 páginas?", todosSonLibrosCortos(1500));