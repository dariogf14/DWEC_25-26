// 1
let estudiantes = [
    { nombre: 'Juan', apellidos: 'Pérez', calificacion: 8, aprobado: true },
    { nombre: 'María', apellidos: 'González', calificacion: 4, aprobado: false },
    { nombre: 'Carlos', apellidos: 'López', calificacion: 6, aprobado: true }
];

// 2
let estudiantesID = estudiantes.map((estudiante , index) => ({estudiante, id: index+1}))

// 3
let estudiantesAprobados = estudiantes.filter(estudiantes => estudiantes.calificacion >= 5)

// 4*
estudiantesAprobados.forEach(estudiante => {
    console.log(`¡Felicidades ${estudiante.nombre}, has aprobado con ${estudiante.calificacion}!`);
});

// 5*
estudiantes.forEach(estudiante => {
    if ((estudiante.calificacion >= 5 && !estudiante.aprobado) || (estudiante.calificacion < 5 && estudiante.aprobado)) {
        console.log(`⚠️ Incoherencia en el registro de ${estudiante.nombre}: calificación = ${estudiante.calificacion}, aprobado = ${estudiante.aprobado}`);
    }
});