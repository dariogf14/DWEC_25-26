function cargarSoporteVital() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "soporte_vital.xml", true);
    xhr.onload = function() {
        const contenedor = document.getElementById("datosSoporteVital");
        if (xhr.status === 200) {
            const xml = xhr.responseXML;
            const medicion = xml.getElementsByTagName("medicion")[0];
            if (medicion) {
                const oxigeno = medicion.getElementsByTagName("oxigeno")[0].textContent;
                const temp = medicion.getElementsByTagName("temperatura")[0].textContent;
                const presion = medicion.getElementsByTagName("presion")[0].textContent;
                contenedor.innerHTML = `
                    <p><strong>Oxígeno:</strong> ${oxigeno}%</p>
                    <p><strong>Temperatura:</strong> ${temp} °C</p>
                    <p><strong>Presión:</strong> ${presion} hPa</p>
                `;
            }
        } else {
            contenedor.innerHTML = `<p style="color:red;">Error al cargar soporte_vital.xml (${xhr.status})</p>`;
        }
    };
    xhr.onerror = () => {
        document.getElementById("datosSoporteVital").innerHTML =
            "<p style='color:red;'>No se pudo acceder a soporte_vital.xml</p>";
    };
    xhr.send();
}

let inventario = [];

function cargarInventario() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "inventario.xml", true);
    xhr.onload = function() {
        const select = document.getElementById("selectItem");
        if (xhr.status === 200) {
            const xml = xhr.responseXML;
            const items = xml.getElementsByTagName("item");
            select.innerHTML = "<option value=''>-- Selecciona un ítem --</option>";
            inventario = [];

            for (let i = 0; i < items.length; i++) {
                const nombre = items[i].getElementsByTagName("nombre")[0].textContent;
                const cantidad = parseFloat(items[i].getElementsByTagName("cantidad")[0].textContent);
                const consumo = parseFloat(items[i].getElementsByTagName("consumo")[0].textContent);
                const unidad = items[i].getAttribute("unidad");
                const id = items[i].getAttribute("id");

                inventario.push({ id, nombre, cantidad, consumo, unidad });
                const opt = document.createElement("option");
                opt.value = id;
                opt.textContent = nombre;
                select.appendChild(opt);
            }

            select.addEventListener("change", mostrarInfoItem);
        } else {
            document.getElementById("inventario").innerHTML =
                `<p style="color:red;">Error al cargar inventario.xml (${xhr.status})</p>`;
        }
    };
    xhr.onerror = () => {
        document.getElementById("inventario").innerHTML =
            "<p style='color:red;'>No se pudo acceder a inventario.xml</p>";
    };
    xhr.send();
}

function mostrarInfoItem() {
    const id = document.getElementById("selectItem").value;
    const info = document.getElementById("infoItem");
    if (!id) {
        info.innerHTML = "";
        return;
    }
    const item = inventario.find(i => i.id === id);
    info.innerHTML = `<p>Disponible: ${item.cantidad} ${item.unidad}</p>`;
}

function calcularAutonomia() {
    const tripulacion = 4;
    const resultado = document.getElementById("resultadoAutonomia");
    let texto = "<h3>Autonomía estimada:</h3>";

    inventario.forEach(item => {
        const autonomia = Math.floor(item.cantidad / (item.consumo * tripulacion));
        texto += `<p>${item.nombre}: ${autonomia} días</p>`;
    });

    resultado.innerHTML = texto;
}

document.getElementById("btnAutonomia").addEventListener("click", calcularAutonomia);

cargarSoporteVital();
cargarInventario();