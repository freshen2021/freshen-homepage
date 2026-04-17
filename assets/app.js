
document.addEventListener('DOMContentLoaded', function () {
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

  const button = document.querySelector('.mobile-menu-button');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const panel = document.querySelector('.mobile-menu-panel');
  const closeBtn = document.querySelector('.mobile-menu-close');
  if (!button || !overlay || !panel || !closeBtn) return;

  function openMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    panel.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('menu-open');
    button.classList.add('is-open');
    button.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    panel.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    button.classList.remove('is-open');
    button.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }

  button.addEventListener('click', openMenu);
  button.addEventListener('touchend', function(e){
    e.preventDefault();
    openMenu(e);
  }, {passive:false});

  closeBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));

  panel.querySelectorAll('.mobile-menu-group-toggle').forEach((toggle) => {
    toggle.addEventListener('click', function() {
      const content = toggle.nextElementSibling;
      const isOpen = content.classList.contains('open');
      panel.querySelectorAll('.mobile-menu-links').forEach(el => el.classList.remove('open'));
      panel.querySelectorAll('.mobile-menu-group-toggle').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        const sign = btn.querySelector('.mobile-menu-plus');
        if (sign) sign.textContent = '+';
      });
      if (!isOpen) {
        content.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        const sign = toggle.querySelector('.mobile-menu-plus');
        if (sign) sign.textContent = '−';
      }
    });
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 900) closeMenu();
  });
});
