const navToggle = document.getElementById('navToggle');
const navPanel = document.getElementById('navPanel');
const navBackdrop = document.getElementById('navBackdrop');

function openNav(){
  navPanel.classList.add('is-open');
  navBackdrop.classList.add('is-open');
  navToggle.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
  navPanel.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeNav(){
  navPanel.classList.remove('is-open');
  navBackdrop.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  navPanel.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  navPanel.classList.contains('is-open') ? closeNav() : openNav();
});

navBackdrop.addEventListener('click', closeNav);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNav();
});

navPanel.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// Close the panel if the viewport grows back to desktop width
window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) closeNav();
});
