
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

  const toggle = document.querySelector('.menu-toggle');
  const navRail = document.querySelector('.nav-rail');
  if (!toggle || !navRail) return;

  // Build a dedicated mobile drawer from desktop nav structure
  const drawer = document.createElement('aside');
  drawer.className = 'mobile-drawer';
  drawer.setAttribute('aria-hidden', 'true');

  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-drawer-backdrop';

  const panel = document.createElement('div');
  panel.className = 'mobile-drawer-panel';

  const head = document.createElement('div');
  head.className = 'mobile-drawer-head';
  head.innerHTML = `
    <div class="mobile-drawer-brand">
      <strong>MENU</strong>
      <span>Freshen navigation</span>
    </div>
    <button class="mobile-drawer-close" aria-label="Close menu">×</button>
  `;

  const body = document.createElement('div');
  body.className = 'mobile-drawer-body';

  const topLinks = Array.from(navRail.querySelectorAll(':scope > .nav-item'));
  topLinks.forEach((item, idx) => {
    const titleLink = item.querySelector(':scope > a');
    if (!titleLink) return;

    const section = document.createElement('section');
    section.className = 'mobile-drawer-section';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'mobile-drawer-section-toggle';
    button.setAttribute('aria-expanded', idx === 0 ? 'true' : 'false');
    button.innerHTML = `<span>${titleLink.textContent.trim()}</span><span class="mobile-drawer-chevron">+</span>`;

    const content = document.createElement('div');
    content.className = 'mobile-drawer-section-content';
    if (idx === 0) content.classList.add('open');

    // include main top link
    const topAnchor = document.createElement('a');
    topAnchor.href = titleLink.getAttribute('href') || '#';
    topAnchor.className = 'mobile-drawer-link mobile-drawer-link-primary';
    topAnchor.textContent = `${titleLink.textContent.trim()} overview`;
    content.appendChild(topAnchor);

    // gather unique links from mega
    const seen = new Set();
    item.querySelectorAll('.mega-col').forEach(col => {
      const heading = col.querySelector('h4');
      const links = Array.from(col.querySelectorAll('a'));
      if (!links.length) return;

      const group = document.createElement('div');
      group.className = 'mobile-drawer-group';

      if (heading) {
        const h = document.createElement('h4');
        h.textContent = heading.textContent.trim();
        group.appendChild(h);
      }

      links.forEach(a => {
        const href = a.getAttribute('href') || '#';
        const text = a.textContent.trim();
        const key = `${href}|${text}`;
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

    button.addEventListener('click', function () {
      const isOpen = content.classList.contains('open');
      body.querySelectorAll('.mobile-drawer-section-content').forEach(el => el.classList.remove('open'));
      body.querySelectorAll('.mobile-drawer-section-toggle').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
      if (!isOpen) {
        content.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });

    section.appendChild(button);
    section.appendChild(content);
    body.appendChild(section);
  });

  panel.appendChild(head);
  panel.appendChild(body);
  drawer.appendChild(backdrop);
  drawer.appendChild(panel);
  document.body.appendChild(drawer);

  const closeBtn = drawer.querySelector('.mobile-drawer-close');

  const openDrawer = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    drawer.classList.add('is-open');
    document.body.classList.add('menu-open');
    drawer.setAttribute('aria-hidden', 'false');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    document.body.classList.remove('menu-open');
    drawer.setAttribute('aria-hidden', 'true');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', openDrawer, { passive: false });
  toggle.addEventListener('touchend', openDrawer, { passive: false });

  backdrop.addEventListener('click', closeDrawer);
  closeBtn.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) closeDrawer();
  });
});
