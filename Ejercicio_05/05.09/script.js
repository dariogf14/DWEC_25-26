const filtro = document.getElementById('filtro')
const items = document.querySelectorAll('#lista li')

filtro.addEventListener('input', () => {
  const texto = filtro.value.toLowerCase()
  items.forEach(li => {
    li.style.display = li.textContent.toLowerCase().includes(texto) ? '' : 'none'
  })
})