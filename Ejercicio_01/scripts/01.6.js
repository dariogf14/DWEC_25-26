// 1
const cursos = [
    {
        nombre: 'Matemáticas',
        profesor: 'Carlos Sánchez',
        estudiantes: [
            { nombre: 'Juan', calificacion: 8 },
            { nombre: 'María', calificacion: 6 },
            { nombre: 'Carlos', calificacion: 9 }
        ]
    },
    {
        nombre: 'Física',
        profesor: 'Ana Pérez',
        estudiantes: [
            { nombre: 'Laura', calificacion: 4 },
            { nombre: 'Pedro', calificacion: 5 },
            { nombre: 'José', calificacion: 3 }
        ]
    },
    {
        nombre: 'Literatura',
        profesor: 'Luis García',
        estudiantes: [
            { nombre: 'Eva', calificacion: 7 },
            { nombre: 'Sofía', calificacion: 9 },
            { nombre: 'Alba', calificacion: 8 }
        ]
    },
    {
        nombre: 'Historia',
        profesor: 'Marta Rodríguez',
        estudiantes: [
            { nombre: 'Ricardo', calificacion: 6 },
            { nombre: 'Pedro', calificacion: 4 },
            { nombre: 'Lucas', calificacion: 5 }
        ]
    }
];

// 2*
const resumenCursos = cursos.map(curso => {
    const promedioCalificaciones = curso.estudiantes.reduce((acc, estudiante) => acc + estudiante.calificacion, 0) / curso.estudiantes.length;
    return {
        nombreCurso: curso.nombre,
        promedioCalificaciones: promedioCalificaciones
    };
});
console.log(resumenCursos)

// 3*
const cursosDestacados = resumenCursos.filter(curso => curso.promedioCalificaciones >=7)
console.log(cursosDestacados)

// 4*
cursosDestacados.forEach(curso => {
  console.log(`📘 El curso ${curso.nombreCurso} tiene un promedio de ${curso.promedioCalificaciones.toFixed(2)} y es considerado destacado.`);
});


// 5*
cursos.forEach(curso => {
    const estudiantesConCalificacionBaja = curso.estudiantes.filter(estudiante => estudiante.calificacion < 4);
    if (estudiantesConCalificacionBaja.length > 0) {
        console.log(`⚠️ Atención: En el curso ${curso.nombre} hay estudiantes con calificaciones muy bajas.`);
    }
});