function cambiarImagenPrincipal(indice) {
  const miniaturas = document.querySelectorAll('.miniatura');
  const nuevaImagen = miniaturas[indice].src;
  document.getElementById('imagen-principal').src = nuevaImagen;
  resaltarMiniatura(indice);
}

function resaltarMiniatura(indice) {
  const miniaturas = document.querySelectorAll('.miniatura');
  miniaturas.forEach(m => m.classList.remove('activa'));
  miniaturas[indice].classList.add('activa');
}