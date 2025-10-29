function actualizarPrecio() {
  let total = 0;

  const tamañoSeleccionado = document.querySelector('input[name="tamaño"]:checked');
  if (tamañoSeleccionado) {
    total += parseFloat(tamañoSeleccionado.value);
  }

  const masa = document.getElementById("masa");
  total += parseFloat(masa.value);

  const extras = document.querySelectorAll('input[type="checkbox"]:checked');
  extras.forEach(extra => {
    total += parseFloat(extra.value);
  });

  document.getElementById("precioTotal").textContent = `Precio Total: ${total.toFixed(2)} €`;
}

const inputs = document.querySelectorAll('input, select');
inputs.forEach(input => {
  input.addEventListener('change', actualizarPrecio);
});

document.getElementById("realizarPedido").addEventListener("click", () => {
  const tamañoSeleccionado = document.querySelector('input[name="tamaño"]:checked');
  const masa = document.getElementById("masa");
  const extras = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
                      .map(extra => extra.dataset.nombre);

  if (!tamañoSeleccionado) {
    alert("Por favor, selecciona un tamaño de pizza antes de continuar.");
    return;
  }

  const resumen = `
  Pedido:
  Tamaño: ${tamañoSeleccionado.dataset.nombre}
  Masa: ${masa.selectedOptions[0].dataset.nombre}
  Ingredientes extra: ${extras.length > 0 ? extras.join(", ") : "Ninguno"}
  ${document.getElementById("precioTotal").textContent}
  `;

  alert(resumen);
});