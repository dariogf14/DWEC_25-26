// 2
import resumenInventario, { 
    crearProducto, 
    filtrarPorCategoria, 
    listarProductosAgotados, 
    calcularValorTotalInventario 
} from "./inventario.js";

const inventario = [];

inventario.push(crearProducto("Smartphone", "Electrónica", 500, 10));
inventario.push(crearProducto("Laptop", "Electrónica", 1200, 5));
inventario.push(crearProducto("Camiseta", "Ropa", 20, 30));
inventario.push(crearProducto("Jeans", "Ropa", 40, 0));
inventario.push(crearProducto("Libro JS", "Libros", 15, 12));
inventario.push(crearProducto("Auriculares", "Electrónica", 80, 0));

const ropa = filtrarPorCategoria(inventario, "Ropa");
console.log("=== Productos de la categoría 'Ropa' ===");
console.log(ropa);

const agotados = listarProductosAgotados(inventario);
console.log("\n=== Productos Agotados ===");
console.log(agotados);

const valorTotal = calcularValorTotalInventario(inventario);
console.log("\nValor total del inventario: $" + valorTotal.toFixed(2));

console.log("\n");
resumenInventario(inventario);