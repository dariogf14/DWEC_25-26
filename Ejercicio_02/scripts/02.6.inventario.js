// 1
export function crearProducto(nombre, categoria, precio, stock) {
    return { nombre, categoria, precio, stock };
}

export function filtrarPorCategoria(inventario, categoria) {
    const productosFiltrados = inventario.filter(producto => producto.categoria === categoria);
    return productosFiltrados
}

export function listarProductosAgotados(inventario) {
    const  productosAgotados = inventario.filter(producto => producto.stock === 0)
    return productosAgotados
}

export function calcularValorTotalInventario(inventario) {
    return inventario.reduce(
        (total, producto) => total + (producto.precio * producto.stock),
        0
    );
}

export default function mostrarProducto(producto) {
    return `Nombre: ${producto.nombre}, Categoria: ${producto.categoria}, Precio: ${producto.precio}, Stock: ${producto.stock}`;
}