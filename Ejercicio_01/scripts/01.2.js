// 1
const coche = {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2022,
    estaDisponible: false
}

// 2
console.table(coche)

// 3
const { marca, modelo } = coche
console.log(marca)
console.log(modelo)

// 4
coche.estaDisponible = true

// 5
coche.color = "Rojo"

// 6
delete coche.año

// 7
console.table(coche)