document.addEventListener('DOMContentLoaded', function () {
  // Hero slideshow
  const slides = Array.from(document.querySelectorAll('.main-hero-slide'));
  const dots = Array.from(document.querySelectorAll('.main-hero-dot'));

  if (slides.length) {
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
  }

  // Mobile menu
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-rail');

  if (!toggle || !nav) return;

  const openMenu = () => {
    nav.classList.add('mobile-open');
    toggle.classList.add('is-open');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    nav.classList.remove('mobile-open');
    toggle.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (nav.classList.contains('mobile-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', toggleMenu, { passive: false });
  toggle.addEventListener('touchend', toggleMenu, { passive: false });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      closeMenu();
    });
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
});