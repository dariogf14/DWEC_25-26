// 1
const ciudades = ["Madrid", "Buenos Aires", "Tokio", "Nueva York", "Paris"]

// 2
ciudades.push("Roma")

// 3
const ciudadesMayusculas = ciudades.map(ciudades => ciudades.toUpperCase())

// 4
const ciudadesFiltradas = ciudades.filter(ciudades => ciudades.length > 6)

// 5  ,
console.table(ciudades)
console.table(ciudadesMayusculas)
console.table(ciudadesFiltradas)