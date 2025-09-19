// 1
const producto = {
    nombre: "Agua",
    precio: 1
}

// 2
const cliente = {
    nombreCliente: "Darío",
    esPremium: false
}

// 3
const pedido = { producto, cliente }

// 4
console.table(pedido)
console.log(pedido)

// 5
const cliente2 = {
    nombre: "Darío",
    esPremium: false
}
const pedido2 = { producto, cliente2 }
// el valor nombre de producto y de cliente aparecen en la misma columna de la tabla
console.table(pedido2)
console.log(pedido)