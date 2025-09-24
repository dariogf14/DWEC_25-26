// 1
export function crearPerfil(nombre, email, edad) {
  return { nombre, email, edad };
}

export default function mostrarPerfil(usuario) {
  return `Nombre: ${usuario.nombre}, Email: ${usuario.email}, Edad: ${usuario.edad}`;
}

// 3
export function esMayorDeEdad(edad) {
    if (edad >= 18) {
        return true;
    } 
    else {
        return false;
    }   
}

export function obtenerMayoresDeEdad(usuarios) {
    return usuarios.filter(usuario => esMayorDeEdad(usuario.edad));
}

export function calcularPromedioEdad(usuarios) {
    const totalEdad = usuarios.reduce((suma, usuario) => suma + usuario.edad, 0);
    return (totalEdad / usuarios.length);
}