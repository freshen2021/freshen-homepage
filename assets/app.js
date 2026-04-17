document.addEventListener('DOMContentLoaded', function () {
  const slides = Array.from(document.querySelectorAll('.main-hero-slide'));
  const dots = Array.from(document.querySelectorAll('.main-hero-dot'));
  if (!slides.length) return;
  let current = 0;
  const activate = (idx) => {
    slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
  };
  activate(current);
  window.setInterval(() => {
    current = (current + 1) % slides.length;
    activate(current);
  }, 5000);
});