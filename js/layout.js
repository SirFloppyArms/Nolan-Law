// Nolan's Everything Site — Header/Nav/Footer (v8: popup menu with search)
(function(){
  const S = window.SITE || {root:'.', section:'', title:''};
  const P = (p)=> (S.root ? (S.root.replace(/\/$/,'') + '/' + p.replace(/^\//,'')) : p);

  const header = document.getElementById('site-header');
  const nav = document.getElementById('site-nav');
  const footer = document.getElementById('site-footer');

  const primaryLinks = [
    ['About','about/index.html'],
    ['Résumé','resume/index.html'],
    ['Projects','projects/index.html'],
    ['Academics','academics/index.html'],
    ['Sports','sports/index.html'],
    ['Music','music/index.html'],
    ['Achievements','achievements/index.html'],
    ['Contact','contact/index.html'],
  ];

  /* ---------------- HEADER ---------------- */
  if(header){
    const logoSrc = P('assets/images/hero-placeholder.jpg');
    header.innerHTML = `
      <div class="container header-grid" role="banner">
        <a href="${P('index.html')}" class="brand" aria-label="Home">
          <div class="logo">
            <img src="${logoSrc}" alt="Nolan Law" loading="eager" decoding="async">
          </div>
          <div class="brand-text">
            <h1 class="site-title">Nolan Law</h1>
            <p class="site-sub">Student • Developer • Athlete • Musician</p>
          </div>
        </a>
        <button id="menu-toggle" aria-label="Open navigation" aria-controls="site-nav" aria-expanded="false" class="menu-toggle">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="breadcrumbs" id="breadcrumbs" aria-label="Breadcrumb"></div>
    `;
  }

  /* ---------------- NAV ---------------- */
  if (nav) {
    nav.className = 'popup-nav';
    nav.setAttribute('role', 'dialog');
    nav.setAttribute('aria-hidden', 'true');
    nav.innerHTML = `
      <div class="popup-nav-content">
        <button class="close-nav" aria-label="Close navigation">&times;</button>
        <input type="search" id="nav-search" placeholder="Search..." aria-label="Search site">
        <nav>
          ${primaryLinks.map(([label, href]) => {
            const url = P(href);
            return `<a href="${url}" data-label="${label.toLowerCase()}">${label}</a>`;
          }).join('')}
        </nav>
      </div>
    `;
  }

  const menuBtn = header?.querySelector('#menu-toggle');

  if (menuBtn && nav) {
    const closeBtn = nav.querySelector('.close-nav');
    const searchInput = nav.querySelector('#nav-search');
    const links = Array.from(nav.querySelectorAll('nav a'));

    // Open / close
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.getAttribute('aria-hidden') === 'false';
      nav.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
      document.documentElement.classList.toggle('nav-open', !isOpen);

      if (!isOpen) {
        setTimeout(()=> searchInput?.focus(), 200);
      }
    });

    closeBtn.addEventListener('click', () => {
      nav.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('nav-open');
    });

    nav.addEventListener('click', (e) => {
      if (e.target === nav) {
        nav.setAttribute('aria-hidden', 'true');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.documentElement.classList.remove('nav-open');
      }
    });

    // Search filter
    searchInput?.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      links.forEach(link => {
        const label = link.dataset.label;
        link.style.display = label.includes(q) ? '' : 'none';
      });
    });
  }

  // Breadcrumbs
  (function(){
    const crumbs = [];
    crumbs.push(`<a href="${P('index.html')}">Home</a>`);
    if(S.section){ crumbs.push(`<a href="${P(S.section.toLowerCase()+'/index.html')}">${S.section}</a>`); }
    if(S.title && S.title !== S.section){ crumbs.push(S.title); }
    const bc = header?.querySelector('#breadcrumbs');
    if(bc){ bc.innerHTML = crumbs.join(' › '); }
  })();

  /* ---------------- FOOTER ---------------- */
  if(footer){
    const year = new Date().getFullYear();
    footer.className = 'site official-footer';
    footer.setAttribute('role','contentinfo');
    footer.innerHTML = `
      <div class="container footer-wrap">
        <div class="footer-brand">
          <a href="${P('index.html')}" class="brand small-brand" aria-label="Home">
            <div class="logo">
              <img src="${P('assets/images/hero-placeholder.jpg')}" alt="Nolan Law" loading="lazy" decoding="async">
            </div>
            <strong>Nolan Law</strong>
          </a>
          <p class="small foot-desc">A living archive of projects, academics, athletics, and music.</p>
        </div>
        <nav class="footer-links" aria-label="Utility">
          <a href="${P('contact/index.html')}">Contact</a>
          <a href="${P('privacy.html')}">Privacy</a>
          <a href="${P('terms.html')}">Terms</a>
          <a href="${P('accessibility.html')}">Accessibility</a>
          <a href="${P('sitemap.xml')}">Sitemap</a>
        </nav>
        <div class="social-links">
          <a href="#" aria-label="GitHub"><i class="icon-github"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="icon-linkedin"></i></a>
          <a href="mailto:someone@example.com" aria-label="Email"><i class="icon-mail"></i></a>
        </div>
      </div>
      <div class="container footer-bottom">
        <div class="small">© ${year} Nolan Law. All rights reserved.</div>
        <div class="small">Built with HTML · CSS · JS</div>
      </div>
    `;
  }

  // ——— Observers / lifecycle ———
  const ro = (window.ResizeObserver) ? new ResizeObserver(()=>{ requestAnimationFrame(applyCollapse); }) : null;
  if(ro && navContainer){ ro.observe(navContainer); }
  if(ro && header){ ro.observe(header); }
  window.addEventListener('resize', applyCollapse, {passive:true});

  // Wait for fonts/layout to settle, then measure.
  const ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  window.addEventListener('load', ()=>{ ready.then(()=>{ setTimeout(applyCollapse, 60); setHeaderHeightVar(); }); });
  // Initial pass (in case this file loads after layout)
  setTimeout(applyCollapse, 0);
})();
