async function cargarLogs() {
  try {
    const response = await fetch("logs.txt");
    if (!response.ok) throw new Error("No se pudo cargar el archivo");

    const texto = await response.text();
    const lineas = texto.split("\n");

    const tbody = document.getElementById("tablaLogs");
    const totalDiv = document.getElementById("totalConsumo");

    let consumoTotalMB = 0;

    lineas.forEach(linea => {
      linea = linea.trim();
      if (!linea) return;

      const idParte = linea.slice(
        linea.indexOf("ID:") + 3,
        linea.indexOf("|")
      );
      const idSesion = idParte.slice(idParte.indexOf("-") + 1);

      const usuario = linea
        .slice(linea.indexOf("USER:") + 5, linea.indexOf("|", linea.indexOf("USER:")))
        .trim()
        .toLowerCase();

      const consumoStr = linea
        .slice(linea.indexOf("CONSUMO:") + 8, linea.indexOf("|", linea.indexOf("CONSUMO:")))
        .trim();

      const consumoBytes = Number(consumoStr);
      const consumoMB = consumoBytes / (1024 * 1024);
      const consumoFinal = Number(consumoMB.toFixed(2));

      consumoTotalMB += consumoFinal;

      const esError = linea.includes("ERROR");

      const tr = document.createElement("tr");
      if (esError) tr.classList.add("error");

      tr.innerHTML = `
        <td>#${idSesion}</td>
        <td>${usuario}</td>
        <td>${consumoFinal.toFixed(2)} MB</td>
        <td class="${esError ? "status-error" : "status-ok"}">
          ${esError ? "ERROR" : "OK"}
        </td>
      `;

      tbody.appendChild(tr);
    });

    totalDiv.textContent = `Consumo Total detectado: ${consumoTotalMB.toFixed(2)} MB`;

  } catch (error) {
    console.error("Error cargando los logs:", error);
    alert("No se pudo cargar el archivo de logs.");
  }
}

cargarLogs();