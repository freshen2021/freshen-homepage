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
    window.setInterval(() => {
      current = (current + 1) % slides.length;
      activate(current);
    }, 5000);
  }

  const toggle = document.querySelector('.menu-toggle');
  const navRail = document.querySelector('.nav-rail');
  if (!toggle || !navRail) return;

  const drawer = document.createElement('aside');
  drawer.className = 'mobile-drawer';
  drawer.innerHTML = '<div class="mobile-drawer-backdrop"></div><div class="mobile-drawer-panel"><div class="mobile-drawer-head"><div class="mobile-drawer-title"><strong>MENU</strong><span>Freshen navigation</span></div><button class="mobile-drawer-close" aria-label="Close menu">×</button></div><div class="mobile-drawer-body"></div></div>';
  document.body.appendChild(drawer);

  const bodyWrap = drawer.querySelector('.mobile-drawer-body');

  Array.from(navRail.querySelectorAll(':scope > .nav-item')).forEach((item, idx) => {
    const topLink = item.querySelector(':scope > a');
    if (!topLink) return;

    const section = document.createElement('section');
    section.className = 'mobile-drawer-section';

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'mobile-drawer-section-toggle';
    toggleBtn.setAttribute('aria-expanded', idx === 0 ? 'true' : 'false');
    toggleBtn.innerHTML = '<span>' + topLink.textContent.trim() + '</span><span class="mobile-drawer-chevron">+</span>';

    const content = document.createElement('div');
    content.className = 'mobile-drawer-section-content' + (idx === 0 ? ' open' : '');

    const primary = document.createElement('a');
    primary.href = topLink.getAttribute('href') || '#';
    primary.className = 'mobile-drawer-link mobile-drawer-link-primary';
    primary.textContent = topLink.textContent.trim();
    content.appendChild(primary);

    const seen = new Set();
    item.querySelectorAll('.mega-col').forEach((col) => {
      const links = Array.from(col.querySelectorAll('a'));
      if (!links.length) return;

      const group = document.createElement('div');
      group.className = 'mobile-drawer-group';

      const heading = col.querySelector('h4');
      if (heading) {
        const h = document.createElement('h4');
        h.textContent = heading.textContent.trim();
        group.appendChild(h);
      }

      links.forEach((a) => {
        const href = a.getAttribute('href') || '#';
        const text = a.textContent.trim();
        const key = href + '|' + text;
        if (seen.has(key)) return;
        seen.add(key);

        const link = document.createElement('a');
        link.href = href;
        link.className = 'mobile-drawer-link';
        link.textContent = text;
        group.appendChild(link);
      });

      content.appendChild(group);
    });

    toggleBtn.addEventListener('click', function () {
      const isOpen = content.classList.contains('open');
      bodyWrap.querySelectorAll('.mobile-drawer-section-content').forEach(el => el.classList.remove('open'));
      bodyWrap.querySelectorAll('.mobile-drawer-section-toggle').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        content.classList.add('open');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    section.appendChild(toggleBtn);
    section.appendChild(content);
    bodyWrap.appendChild(section);
  });

  const closeBtn = drawer.querySelector('.mobile-drawer-close');
  const backdrop = drawer.querySelector('.mobile-drawer-backdrop');

  function openDrawer(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    drawer.classList.add('is-open');
    document.body.classList.add('menu-open');
    toggle.classList.add('is-open');
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    toggle.classList.remove('is-open');
  }

  toggle.addEventListener('click', openDrawer);
  toggle.addEventListener('touchend', openDrawer, { passive: false });
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeDrawer();
  });
});