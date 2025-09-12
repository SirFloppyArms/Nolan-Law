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
      <div class="container">
        <div class="breadcrumbs" id="breadcrumbs" aria-label="Breadcrumb"></div>
      </div>
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
        <div class="social-links" aria-label="Social Media">
          <a href="https://github.com/SirFloppyArms" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <!-- GitHub SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 0a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.9 0-1.3.47-2.36 1.24-3.19-.13-.3-.54-1.52.12-3.16 0 0 1-.32 3.3 1.22a11.5 11.5 0 0 1 6 0c2.3-1.54 3.3-1.22 3.3-1.22.66 1.64.25 2.86.12 3.16.77.83 1.24 1.89 1.24 3.19 0 4.58-2.8 5.6-5.48 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.82.57A12 12 0 0 0 12 0z"/>
            </svg>
          </a>

          <a href="https://instagram.com/nolanlaw22" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <!-- Instagram SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zM18 6a1 1 0 1 1-1-1 1 1 0 0 1 1 1z"/>
            </svg>
          </a>

          <a href="mailto:nolan.law@yahoo.com" aria-label="Email">
            <!-- Email SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z"/>
            </svg>
          </a>
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
