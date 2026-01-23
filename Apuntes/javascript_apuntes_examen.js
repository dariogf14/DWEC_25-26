/*
====================================================
 JAVASCRIPT – APUNTES COMPLETOS PARA EXAMEN
 Archivo de consulta rápida (cheat sheet)
 Puedes usarlo durante el examen para resolver dudas
====================================================
*/

/*==================================================
 1. VARIABLES
==================================================*/

// var -> forma antigua de declarar variables (NO recomendada)
var edad = 18; // variable global o de función

// let -> variable que puede cambiar su valor
let nombre = "Álvaro"; // solo existe dentro del bloque {}

// const -> variable constante (NO se puede reasignar)
const PI = 3.1416; // ideal para valores fijos


/*==================================================
 2. TIPOS DE DATOS
==================================================*/

let numero = 10;            // Number
let texto = "Hola";         // String
let booleano = true;        // Boolean
let indefinido;             // undefined (no tiene valor)
let nulo = null;            // null (valor intencionalmente vacío)
let simbolo = Symbol("id"); // Symbol
let objeto = {};            // Object


/*==================================================
 3. OPERADORES
==================================================*/

// Aritméticos
let suma = 5 + 3;        // 8
let resta = 5 - 3;      // 2
let multiplicar = 5 * 3;// 15
let dividir = 6 / 2;    // 3
let modulo = 5 % 2;     // 1 (resto)

// Comparación
5 == "5";   // true (compara valor)
5 === "5";  // false (compara valor y tipo)
5 != 4;     // true
5 !== "5";  // true

// Lógicos
true && false; // AND
true || false; // OR
!true;         // NOT


/*==================================================
 4. CONDICIONALES
==================================================*/

// if / else
let nota = 7;

if (nota >= 5) {
    // Se ejecuta si la condición es verdadera
    console.log("Aprobado");
} else {
    // Se ejecuta si la condición es falsa
    console.log("Suspenso");
}

// else if
if (nota >= 9) {
    console.log("Sobresaliente");
} else if (nota >= 5) {
    console.log("Aprobado");
} else {
    console.log("Suspenso");
}

// Operador ternario (if corto)
let resultado = (nota >= 5) ? "Aprobado" : "Suspenso";


/*==================================================
 5. BUCLES
==================================================*/

// for -> cuando sabes cuántas veces se repite
for (let i = 0; i < 5; i++) {
    // i empieza en 0 y se incrementa hasta 4
    console.log(i);
}

// while -> se ejecuta mientras la condición sea true
let contador = 0;

while (contador < 3) {
    console.log(contador);
    contador++;
}

// do while -> se ejecuta al menos una vez
let x = 0;

do {
    console.log(x);
    x++;
} while (x < 3);


/*==================================================
 6. FUNCIONES
==================================================*/

// Función tradicional
function saludar(nombre) {
    // Recibe un parámetro y muestra un saludo
    return "Hola " + nombre;
}

// Llamada a la función
saludar("Álvaro");

// Función flecha (arrow function)
const sumar = (a, b) => {
    // Devuelve la suma de dos números
    return a + b;
};

// Arrow function corta (return implícito)
const multiplicar2 = (a, b) => a * b;


/*==================================================
 7. ARRAYS
==================================================*/

let numeros = [1, 2, 3, 4];

// Acceder a un elemento
numeros[0]; // 1

// Añadir al final
numeros.push(5);

// Eliminar último
numeros.pop();

// Recorrer array
numeros.forEach(function(num) {
    // Se ejecuta por cada elemento
    console.log(num);
});

// map -> crea un nuevo array
let dobles = numeros.map(n => n * 2);

// filter -> filtra elementos
let mayores = numeros.filter(n => n > 2);


/*==================================================
 8. OBJETOS
==================================================*/

let persona = {
    nombre: "Álvaro",
    edad: 25,
    saludar: function() {
        // Método dentro de un objeto
        return "Hola, soy " + this.nombre;
    }
};

// Acceder a propiedades
persona.nombre;
persona["edad"];

// Llamar método
persona.saludar();


/*==================================================
 9. STRINGS
==================================================*/

let frase = "Hola Mundo";

frase.length;           // Longitud
frase.toUpperCase();    // Mayúsculas
frase.toLowerCase();    // Minúsculas
frase.includes("Hola"); // true
frase.split(" ");       // ["Hola", "Mundo"]


/*==================================================
 10. MANEJO DE ERRORES
==================================================*/

try {
    // Código que puede fallar
    let r = x + 1;
} catch (error) {
    // Se ejecuta si hay error
    console.log(error);
} finally {
    // Siempre se ejecuta
    console.log("Fin");
}


/*==================================================
 11. ASINCRONÍA
==================================================*/

// setTimeout -> ejecuta después de X ms
setTimeout(() => {
    console.log("Han pasado 2 segundos");
}, 2000);

// Promesa
let promesa = new Promise((resolve, reject) => {
    let exito = true;

    if (exito) {
        resolve("Todo salió bien");
    } else {
        reject("Error");
    }
});

// async / await
async function ejecutar() {
    try {
        let resultado = await promesa;
        console.log(resultado);
    } catch (e) {
        console.log(e);
    }
}


/*==================================================
 12. DOM (MUY TÍPICO EN EXÁMENES)
==================================================*/

// Seleccionar elementos
document.getElementById("titulo");
document.querySelector(".clase");

// Cambiar contenido
document.getElementById("titulo").textContent = "Nuevo texto";

// Eventos
document.getElementById("btn").addEventListener("click", function() {
    // Se ejecuta al hacer click
    alert("Botón pulsado");
});


/*
====================================================
 FIN DEL ARCHIVO
 Mucha suerte en el examen 💪
====================================================
*/
