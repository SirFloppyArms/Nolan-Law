
// Nolan's Everything Site — Enhanced Layout & Navigation Builder
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
    header.innerHTML = `
      <div class="container header-grid">
        <a href="${P('index.html')}" class="brand">
          <div class="logo"></div>
          <div>
            <h1 class="site-title">Nolan Law</h1>
            <p class="site-sub">Student • Developer • Athlete • Musician</p>
          </div>
        </a>
        <button id="menu-toggle" aria-label="Toggle Navigation" class="menu-toggle">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="breadcrumbs" id="breadcrumbs"></div>
    `;
  }

  /* ---------------- NAV ---------------- */
  if(nav){
    nav.classList.add('container','primary');
    nav.innerHTML = primaryLinks.map(([label, href])=>{
      const url = P(href);
      const active = (S.section && label.toLowerCase() === S.section.toLowerCase()) ? 'active' : '';
      return `<a class="${active}" href="${url}">${label}</a>`;
    }).join('');
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-toggle');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      menuBtn.classList.toggle('open');
    });
  }

  // Breadcrumbs
  const crumbs = [];
  crumbs.push(`<a href="${P('index.html')}">Home</a>`);
  if(S.section){ crumbs.push(`<a href="${P(S.section.toLowerCase()+'/index.html')}">${S.section}</a>`); }
  if(S.title && S.title !== S.section){ crumbs.push(S.title); }
  const bc = document.getElementById('breadcrumbs');
  if(bc){ bc.innerHTML = crumbs.join(' › '); }

  /* ---------------- FOOTER ---------------- */
  if(footer){
    const year = new Date().getFullYear();
    footer.classList.add('site');
    footer.innerHTML = `
      <div class="container footer-grid">
        <div>
          <a href="${P('index.html')}" class="brand small-brand">
            <div class="logo"></div>
            <strong>Nolan Law</strong>
          </a>
          <p class="small">A living archive of projects, academics, sports, music, and milestones.</p>
        </div>
        <div>
          <strong>Explore</strong>
          <nav class="footer-nav">
            ${primaryLinks.map(([l,h])=>`<a href="${P(h)}">${l}</a>`).join('')}
          </nav>
        </div>
        <div>
          <strong>Connect</strong>
          <div class="social-links">
            <a href="#" aria-label="GitHub"><i class="icon-github"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="icon-linkedin"></i></a>
            <a href="#" aria-label="Email"><i class="icon-mail"></i></a>
          </div>
          <div class="small">© ${year} Nolan Law</div>
          <div class="small">Last build: ${new Date().toISOString().slice(0,10)}</div>
        </div>
      </div>
    `;
  }
})();
