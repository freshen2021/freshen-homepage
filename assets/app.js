
document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.main-hero-slide'));
  const dots = Array.from(document.querySelectorAll('.main-hero-dot'));
  if (slides.length) {
    let current = 0;
    const activate = (idx) => {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
    };
    activate(current);
    setInterval(() => {
      current = (current + 1) % slides.length;
      activate(current);
    }, 5000);
  }

  const toggle = document.querySelector('.menu-toggle');
  const navRail = document.querySelector('.nav-rail');
  if (toggle && navRail) {
    toggle.addEventListener('click', () => {
      navRail.style.display = navRail.style.display === 'flex' ? 'none' : 'flex';
      if (navRail.style.display === 'flex') {
        navRail.style.position = 'absolute';
        navRail.style.top = '92px';
        navRail.style.left = '24px';
        navRail.style.right = '24px';
        navRail.style.background = '#fff';
        navRail.style.border = '1px solid #ddd8cf';
        navRail.style.padding = '18px';
        navRail.style.flexDirection = 'column';
        navRail.style.alignItems = 'flex-start';
        navRail.style.height = 'auto';
        navRail.style.zIndex = '130';
      }
    });
  }
});
