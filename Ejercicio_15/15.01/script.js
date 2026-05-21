const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewList = document.getElementById('previewList');
const resultsList = document.getElementById('resultsList');
const processBtn = document.getElementById('processBtn');
const clearBtn = document.getElementById('clearBtn');
const watermarkText = document.getElementById('watermarkText');
const maxWidthInput = document.getElementById('maxWidth');
const outputFormat = document.getElementById('outputFormat');

let loadedImages = [];

mostrarMensajeInicial();

dropZone.addEventListener('dragover', event => {
  event.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', event => {
  event.preventDefault();
  dropZone.classList.remove('drag-over');

  const files = Array.from(event.dataTransfer.files);
  cargarArchivos(files);
});

fileInput.addEventListener('change', event => {
  const files = Array.from(event.target.files);
  cargarArchivos(files);
});

processBtn.addEventListener('click', procesarImagenes);

clearBtn.addEventListener('click', () => {
  loadedImages = [];
  fileInput.value = '';
  previewList.innerHTML = '';
  resultsList.innerHTML = '';
  mostrarMensajeInicial();
});

function mostrarMensajeInicial() {
  previewList.innerHTML = '<p class="empty">Todavía no has cargado imágenes.</p>';
  resultsList.innerHTML = '<p class="empty">Los resultados aparecerán aquí.</p>';
}

function cargarArchivos(files) {
  const imageFiles = files.filter(file => file.type.startsWith('image/'));

  if (imageFiles.length === 0) {
    alert('Selecciona archivos de imagen válidos.');
    return;
  }

  previewList.innerHTML = '';

  imageFiles.forEach(file => {
    const reader = new FileReader();

    reader.onload = event => {
      const imageData = {
        file,
        name: file.name,
        dataUrl: event.target.result
      };

      loadedImages.push(imageData);
      renderPreview(imageData);
    };

    reader.readAsDataURL(file);
  });
}

function renderPreview(imageData) {
  const card = document.createElement('article');
  card.className = 'image-card';

  card.innerHTML = `
    <img src="${imageData.dataUrl}" alt="${imageData.name}">
    <p><strong>${imageData.name}</strong></p>
    <p>${Math.round(imageData.file.size / 1024)} KB</p>
  `;

  previewList.appendChild(card);
}

function procesarImagenes() {
  if (loadedImages.length === 0) {
    alert('Primero carga una o varias imágenes.');
    return;
  }

  resultsList.innerHTML = '';

  loadedImages.forEach(imageData => {
    procesarImagen(imageData);
  });
}

function procesarImagen(imageData) {
  const img = new Image();

  img.onload = () => {
    const maxWidth = Number(maxWidthInput.value) || img.width;
    const ratio = maxWidth < img.width ? maxWidth / img.width : 1;

    const newWidth = Math.round(img.width * ratio);
    const newHeight = Math.round(img.height * ratio);

    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, newWidth, newHeight);
    aplicarMarcaDeAgua(ctx, newWidth, newHeight);

    const format = outputFormat.value;
    const extension = format === 'image/png' ? 'png' : 'jpg';
    const quality = format === 'image/jpeg' ? 0.9 : undefined;

    const processedDataUrl = canvas.toDataURL(format, quality);
    renderResult(imageData.name, processedDataUrl, extension);
  };

  img.src = imageData.dataUrl;
}

function aplicarMarcaDeAgua(ctx, width, height) {
  const text = watermarkText.value.trim();

  if (!text) {
    return;
  }

  const fontSize = Math.max(18, Math.round(width * 0.04));
  const padding = Math.round(width * 0.03);

  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textBaseline = 'bottom';

  const textWidth = ctx.measureText(text).width;
  const x = width - textWidth - padding;
  const y = height - padding;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  ctx.fillRect(x - 10, y - fontSize - 8, textWidth + 20, fontSize + 14);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  ctx.fillText(text, x, y);
}

function renderResult(originalName, dataUrl, extension) {
  const cleanName = originalName.replace(/\.[^/.]+$/, '');
  const finalName = `editada-${cleanName}.${extension}`;

  const card = document.createElement('article');
  card.className = 'image-card';

  card.innerHTML = `
    <img src="${dataUrl}" alt="${finalName}">
    <p><strong>${finalName}</strong></p>
    <a class="download-link" href="${dataUrl}" download="${finalName}">Descargar</a>
  `;

  resultsList.appendChild(card);
}
