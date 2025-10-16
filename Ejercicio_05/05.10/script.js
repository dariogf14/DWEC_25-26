const boton = document.getElementById('generar')
const input = document.getElementById('cantidad')
const resultado = document.getElementById('resultado')

boton.addEventListener('click', () => {
  const num = Number(input.value)
  resultado.innerHTML = ''
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < num; i++) {
    const p = document.createElement('p')
    p.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    fragment.appendChild(p)
  }
  resultado.appendChild(fragment)
})