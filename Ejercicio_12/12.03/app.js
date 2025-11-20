const form = document.getElementById('form-producto');
const nombreInput = document.getElementById('nombre');
const skuInput = document.getElementById('sku');
const precioInput = document.getElementById('precio');
const stockInput = document.getElementById('stock');
const categoriaInput = document.getElementById('categoria');
const guardarBtn = document.getElementById('guardar');
const mensajeExito = document.getElementById('mensaje-exito');

const errorNombre = document.getElementById('error-nombre');
const errorSku = document.getElementById('error-sku');
const estadoSku = document.getElementById('estado-sku');
const errorPrecio = document.getElementById('error-precio');
const errorStock = document.getElementById('error-stock');
const errorCategoria = document.getElementById('error-categoria');

let camposValidos = {
  nombre: false,
  sku: false,
  precio: false,
  stock: false,
  categoria: false
};

nombreInput.addEventListener('input', () => {
  if (nombreInput.value.trim() === '') {
    errorNombre.textContent = 'El nombre es obligatorio';
    camposValidos.nombre = false;
  } else {
    errorNombre.textContent = '';
    camposValidos.nombre = true;
  }
  validarFormulario();
});

precioInput.addEventListener('input', () => {
  const valor = parseFloat(precioInput.value);
  if (isNaN(valor) || valor <= 0) {
    errorPrecio.textContent = 'El precio debe ser mayor que 0';
    camposValidos.precio = false;
  } else {
    errorPrecio.textContent = '';
    camposValidos.precio = true;
  }
  validarFormulario();
});

stockInput.addEventListener('input', () => {
  const valor = parseInt(stockInput.value);
  if (isNaN(valor) || valor < 0) {
    errorStock.textContent = 'El stock debe ser 0 o mayor';
    camposValidos.stock = false;
  } else {
    errorStock.textContent = '';
    camposValidos.stock = true;
  }
  validarFormulario();
});

categoriaInput.addEventListener('input', () => {
  if (categoriaInput.value.trim() === '') {
    errorCategoria.textContent = 'La categoría es obligatoria';
    camposValidos.categoria = false;
  } else {
    errorCategoria.textContent = '';
    camposValidos.categoria = true;
  }
  validarFormulario();
});

skuInput.addEventListener('input', () => {
  if (skuInput.value.trim().length < 5) {
    errorSku.textContent = 'El SKU debe tener al menos 5 caracteres';
    camposValidos.sku = false;
  } else {
    errorSku.textContent = '';
    camposValidos.sku = true;
  }
  validarFormulario();
});

skuInput.addEventListener('blur', async () => {
  if (!camposValidos.sku) return;

  const sku = skuInput.value.trim();
  estadoSku.textContent = 'Validando SKU...';
  errorSku.textContent = '';
  guardarBtn.disabled = true;

  const existe = await validarSku(sku);

  if (existe) {
    errorSku.textContent = 'El SKU ya existe';
    camposValidos.sku = false;
  } else {
    camposValidos.sku = true;
  }
  estadoSku.textContent = '';
  validarFormulario();
});

function validarFormulario() {
  guardarBtn.disabled = !Object.values(camposValidos).every(v => v);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  mensajeExito.textContent = `Producto '${nombreInput.value.trim()}' guardado correctamente`;
  form.reset();
  guardarBtn.disabled = true;
  camposValidos = { nombre: false, sku: false, precio: false, stock: false, categoria: false };
});

async function validarSku(sku) {
  try {
    const response = await fetch('./data/productos.json');
    if (!response.ok) throw new Error('No se pudo cargar la lista de productos');
    const productos = await response.json();
    return productos.some(p => p.sku.toLowerCase() === sku.toLowerCase());
  } catch (error) {
    console.error(error);
    return false;
  }
}