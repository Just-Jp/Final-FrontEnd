document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.navbar-collapse');
  const overlay = document.querySelector('.menu-overlay');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('show');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('show');
    overlay.classList.remove('active');
  });
});