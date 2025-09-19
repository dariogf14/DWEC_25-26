// 1
const usuario = {
    nombre:"Darío", 
    gmail:"dariogf14@educastur.es"
}

// 2
const perfil = {
    puesto:"Desarrollador Web",
    empresa:"Freelance"
}

// 3
const empleado = {...usuario, ...perfil}

// 4
const ciudad = empleado.perfil?.direccion?.ciudad;

// 5
const ciudadFinal = ciudad ?? "Ciudad no especificada"
console.log(ciudadFinal)