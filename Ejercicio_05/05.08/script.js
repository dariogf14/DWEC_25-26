const boton = document.getElementById('ordenar')
const lista = document.getElementById('lista')

boton.addEventListener('click', () => {
  const items = Array.from(lista.querySelectorAll('li'))
  items.sort((a, b) => a.textContent.localeCompare(b.textContent))
  lista.innerHTML = ''
  items.forEach(item => lista.appendChild(item))
})