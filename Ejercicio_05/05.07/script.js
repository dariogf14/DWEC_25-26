const productos = document.getElementById('productos')
const carrito = document.getElementById('carrito')
const total = document.getElementById('total')

productos.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const li = e.target.parentElement.cloneNode(true)
    const quitar = document.createElement('button')
    quitar.textContent = 'Quitar'
    li.appendChild(quitar)
    carrito.appendChild(li)
    calcularTotal()
  }
})

carrito.addEventListener('click', e => {
  if (e.target.textContent === 'Quitar') {
    e.target.parentElement.remove()
    calcularTotal()
  }
})

function calcularTotal() {
  let suma = 0
  carrito.querySelectorAll('li').forEach(li => {
    suma += Number(li.getAttribute('data-price'))
  })
  total.textContent = suma
}