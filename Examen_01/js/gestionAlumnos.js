let alumnos = [];
function cargarAlumnos() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "alumnos.xml", true);
    xhr.onload = function() {
        const contenedor = document.getElementById("datosAlumnos");
        alumnos = [];
        for (let i = 0; i < items.length; i++) {
            const nombre = alumno.getElementsByTagName("nombre")[i].textContent;
            const apellidos = alumno.getElementsByTagName("apellidos")[i].textContent;
            const email = alumno.getElementsByTagName("email")[i].textContent;
            const edad = alumno.getElementsByTagName("edad")[i].textContent;
            const direccion = alumno.getElementsByTagName("direccion")[i].textContent;
            const localidad = alumno.getElementsByTagName("localidad")[i].textContent;

            inventario.push({ nombre, apellidos, email, edad, direccion, localidad });
            const opt = document.createElement("option");
            opt.value = i;
            opt.textContent = nombre;
            select.appendChild(opt);
        } 
        select.addEventListener("change", mostrarAlumno);
    }
}
