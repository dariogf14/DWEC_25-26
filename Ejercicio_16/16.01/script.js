async function cargarLogs() {
  try {
    const response = await fetch("logs.txt");

    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo");
    }

    const texto = await response.text();
    const lineas = texto.split("\n");

    const tbody = document.getElementById("tablaLogs");
    const totalDiv = document.getElementById("totalConsumo");
    const mensaje = document.getElementById("mensaje");

    tbody.innerHTML = "";

    let consumoTotalMB = 0;
    let registrosProcesados = 0;

    lineas.forEach(lineaOriginal => {
      const linea = lineaOriginal.trim();

      if (!linea) {
        return;
      }

      const partes = linea.split("|").map(parte => parte.trim());

      const idParte = extraerValor(partes, "ID:");
      const posicionGuion = idParte.indexOf("-");
      const idSesion = posicionGuion !== -1
        ? idParte.slice(posicionGuion + 1)
        : idParte;

      const usuario = extraerValor(partes, "USER:", "user:")
        .trim()
        .toLowerCase();

      const consumoStr = extraerValor(partes, "CONSUMO:", "consumo:")
        .replace("bytes", "")
        .trim();

      const consumoBytes = Number(consumoStr);
      const consumoMB = consumoBytes / 1_000_000;
      const consumoFinal = Number(consumoMB.toFixed(2));

      consumoTotalMB += consumoFinal;

      const estado = extraerValor(partes, "STATUS:", "status:").toUpperCase();
      const esError = estado.includes("ERROR");

      const tr = document.createElement("tr");

      if (esError) {
        tr.classList.add("error");
      }

      tr.innerHTML = `
        <td>#${idSesion}</td>
        <td>${usuario}</td>
        <td>${consumoFinal.toFixed(2)} MB</td>
        <td>
          <span class="${esError ? "status-error" : "status-ok"}">
            ${esError ? "ERROR" : "OK"}
          </span>
        </td>
      `;

      tbody.appendChild(tr);
      registrosProcesados++;
    });

    totalDiv.textContent = `Consumo Total detectado: ${consumoTotalMB.toFixed(2)} MB`;
    mensaje.textContent = `Registros procesados correctamente: ${registrosProcesados}`;
  } catch (error) {
    console.error("Error cargando los logs:", error);

    const mensaje = document.getElementById("mensaje");
    mensaje.textContent = "No se pudo cargar el archivo de logs.";
    mensaje.classList.add("error");
  }
}

function extraerValor(partes, etiquetaMayus, etiquetaMinus) {
  const etiquetaAlternativa = etiquetaMinus || etiquetaMayus.toLowerCase();

  const parteEncontrada = partes.find(parte => {
    return parte.includes(etiquetaMayus) || parte.includes(etiquetaAlternativa);
  });

  if (!parteEncontrada) {
    return "";
  }

  if (parteEncontrada.includes(etiquetaMayus)) {
    return parteEncontrada.slice(parteEncontrada.indexOf(etiquetaMayus) + etiquetaMayus.length);
  }

  return parteEncontrada.slice(parteEncontrada.indexOf(etiquetaAlternativa) + etiquetaAlternativa.length);
}

cargarLogs();
