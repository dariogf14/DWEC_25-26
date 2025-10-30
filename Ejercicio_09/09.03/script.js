const progressBar = document.getElementById('progress-bar');
const toTopBtn = document.getElementById('toTopBtn');

window.addEventListener('scroll', () => {
  const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollTop = window.scrollY;

  const scrollPercent = (scrollTop / scrollTotal) * 100;
  progressBar.style.width = `${scrollPercent}%`;

  if (scrollTop > window.innerHeight) {
    toTopBtn.classList.add('visible');
  } else {
    toTopBtn.classList.remove('visible');
  }
});

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});