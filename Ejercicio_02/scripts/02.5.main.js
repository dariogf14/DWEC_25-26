// 2
/* 
import mostrarPerfil, { crearPerfil as crear } from "./02.5.gestorUsuarios.js";

const usuario1 = crear("Ana", "ana@gmail.com", 20);
const usuario2 = crear("Luis", "luis@gmail.com", 21);

const usuarios = [usuario1, usuario2];

usuarios.forEach(usuario => { 
    console.log(mostrarPerfil(usuario))
}); 
*/

// 4
import mostrarPerfil, { 
  crearPerfil as crear, 
  esMayorDeEdad, 
  obtenerMayoresDeEdad, 
  calcularPromedioEdad 
} from "./02.5.gestorUsuarios.js";

const usuarios = [
  crear("Ana", "ana@mail.com", 25),
  crear("Luis", "luis@mail.com", 17),
  crear("María", "maria@mail.com", 20),
  crear("Pedro", "pedro@mail.com", 15),
  crear("Sofía", "sofia@mail.com", 22)
];

const mayoresDeEdad = obtenerMayoresDeEdad(usuarios);

console.log("Usuarios mayores de edad:");
mayoresDeEdad.forEach(usuario => {
    console.log(mostrarPerfil(usuario));
});

const edadPromedio = calcularPromedioEdad(usuarios);
console.log(`La edad promedio de los usuarios es: ${edadPromedio}`);