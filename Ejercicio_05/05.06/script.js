document.querySelector('.tabs').addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    document.querySelectorAll('.panel').forEach(div => div.classList.add('oculto'))
    const id = e.target.dataset.id
    document.getElementById(id).classList.remove('oculto')
  }
})
