/* ═══════════════════════════════════
   SB STUDIO v2 — MAIN JS
   ═══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ────────────────────── */
  const loader = document.getElementById('loader');
  const fill   = document.querySelector('.ld-fill');
  let pct = 0;
  const ldInt = setInterval(() => {
    pct += Math.random() * 14;
    if (pct >= 100) {
      pct = 100;
      clearInterval(ldInt);
      fill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('out');
        document.body.style.overflow = '';
        boot();
      }, 450);
    }
    fill.style.width = Math.min(pct, 98) + '%';
  }, 70);
  document.body.style.overflow = 'hidden';

  /* ── CURSOR ────────────────────── */
  const cur  = document.getElementById('cur');
  const cur2 = document.getElementById('cur2');
  let cx = 0, cy = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
  (function tickCursor() {
    fx += (cx - fx) * 0.13; fy += (cy - fy) * 0.13;
    if (cur)  { cur.style.left  = cx + 'px'; cur.style.top  = cy + 'px'; }
    if (cur2) { cur2.style.left = fx + 'px'; cur2.style.top = fy + 'px'; }
    requestAnimationFrame(tickCursor);
  })();
  document.querySelectorAll('a,button,.wg-item,.gi,.film-item,.ct-link').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cur)  cur.style.transform  = 'translate(-50%,-50%) scale(2)';
      if (cur2) { cur2.style.transform = 'translate(-50%,-50%) scale(1.4)'; cur2.style.borderColor = 'rgba(201,161,85,.8)'; }
    });
    el.addEventListener('mouseleave', () => {
      if (cur)  cur.style.transform  = 'translate(-50%,-50%) scale(1)';
      if (cur2) { cur2.style.transform = 'translate(-50%,-50%) scale(1)'; cur2.style.borderColor = 'rgba(201,161,85,.5)'; }
    });
  });

  /* ── NAV ───────────────────────── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav.classList.toggle('stuck', scrollY > 60), { passive: true });

  const ham   = document.getElementById('ham');
  const mmenu = document.getElementById('mmenu');
  ham?.addEventListener('click', () => {
    const open = mmenu.classList.toggle('open');
    ham.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(4px,4px)'  : '';
    ham.querySelectorAll('span')[1].style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
  });
  mmenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mmenu.classList.remove('open');
    ham.querySelectorAll('span').forEach(s => s.style.transform = '');
  }));

  /* ── BOOT (after loader) ───────── */
  function boot() {
    initGSAP();
    initGallery();
    initLightbox();
    initFilms();
    initSmoothScroll();
  }

  /* ── GSAP ANIMATIONS ───────────── */
  function initGSAP() {
    if (typeof gsap === 'undefined') {
      document.querySelectorAll('.r-up').forEach(el => { el.style.opacity=1; el.style.transform='none'; });
      return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // Hero reveal
    gsap.to('.r-up', {
      opacity: 1, y: 0,
      duration: 1.3, stagger: .2, ease: 'power4.out', delay: .1
    });

    // Work items
    gsap.utils.toArray('.wg-item').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        opacity: 0, y: 40, duration: .9, delay: i * .08, ease: 'power3.out'
      });
    });

    // Gallery items
    gsap.from('.gi', {
      scrollTrigger: { trigger: '.gal-grid', start: 'top 85%', once: true },
      opacity: 0, scale: .95, duration: .7, stagger: .05, ease: 'power2.out'
    });

    // Film items
    gsap.utils.toArray('.film-item').forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        opacity: 0, y: 30, duration: .8, delay: i * .1, ease: 'power2.out'
      });
    });

    // Contact
    gsap.from('.ct-left > *', {
      scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true },
      opacity: 0, x: -40, duration: .9, stagger: .12, ease: 'power3.out'
    });
    gsap.from('.ct-right', {
      scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true },
      opacity: 0, x: 40, duration: .9, ease: 'power3.out'
    });

    // Hero parallax
    gsap.to('.hero-title', {
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      y: 120, opacity: 0
    });
  }

  /* ── GALLERY FILTER ────────────── */
  function initGallery() {
    const btns = document.querySelectorAll('.gf-btn');
    const items = document.querySelectorAll('.gi');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        items.forEach(it => {
          if (f === 'all' || it.dataset.cat === f) {
            it.classList.remove('hidden');
            it.style.animation = 'fadeIn .4s ease';
          } else {
            it.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ── LIGHTBOX ──────────────────── */
  function initLightbox() {
    const lb    = document.getElementById('lb');
    const lbImg = document.getElementById('lb-img');
    const items = [...document.querySelectorAll('.gi:not(.hidden)')];
    let current = 0;

    // Collect all gallery images
    function getVisible() { return [...document.querySelectorAll('.gi:not(.hidden)')]; }

    function open(idx) {
      const vis = getVisible();
      current = idx;
      lbImg.src = vis[current]?.dataset.src || '';
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    }
    function close() { lb.classList.remove('on'); document.body.style.overflow = ''; }
    function prev() { const v = getVisible(); current = (current - 1 + v.length) % v.length; lbImg.src = v[current].dataset.src; }
    function next() { const v = getVisible(); current = (current + 1) % v.length; lbImg.src = v[current].dataset.src; }

    document.querySelectorAll('.gi').forEach((it, i) => it.addEventListener('click', () => {
      const vis = getVisible();
      const idx = vis.indexOf(it);
      if (idx !== -1) open(idx);
    }));

    document.querySelector('.lb-x')?.addEventListener('click', close);
    document.querySelector('.lb-p')?.addEventListener('click', prev);
    document.querySelector('.lb-n')?.addEventListener('click', next);
    lb?.addEventListener('click', e => { if (e.target === lb) close(); });
    document.addEventListener('keydown', e => {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    });

    // Touch swipe
    let tx = 0;
    lb?.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lb?.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    });
  }

  /* ── FILMS / VIDEO MODAL ───────── */
  function initFilms() {
    const modal   = document.getElementById('vmodal');
    const player  = document.getElementById('vm-player');
    const ytFrame = document.getElementById('vm-yt');

    document.querySelectorAll('.film-item').forEach(item => {
      item.addEventListener('click', () => {
        const videoSrc = item.dataset.video || '';
        const ytSrc    = item.dataset.yt    || '';

        if (ytSrc) {
          // YouTube embed
          ytFrame.src = ytSrc + '?autoplay=1&rel=0';
          modal.classList.add('on', 'yt');
        } else if (videoSrc) {
          // Local video
          player.src = videoSrc;
          modal.classList.add('on');
          modal.classList.remove('yt');
          player.play().catch(() => {});
        } else {
          return; // no video set yet
        }
        document.body.style.overflow = 'hidden';
      });
    });

    function closeModal() {
      modal.classList.remove('on', 'yt');
      player.pause(); player.src = '';
      ytFrame.src = '';
      document.body.style.overflow = '';
    }

    document.querySelector('.vm-close')?.addEventListener('click', closeModal);
    modal?.addEventListener('click', e => { if (e.target === modal || e.target === document.querySelector('.vm-inner') === false) { if (e.target === modal) closeModal(); } });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('on')) closeModal(); });
  }

  /* ── SMOOTH SCROLL ─────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        const top = t.getBoundingClientRect().top + scrollY - 72;
        if (typeof gsap !== 'undefined') {
          gsap.to(window, { scrollTo: top, duration: 1.1, ease: 'power3.inOut' });
        } else {
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── CSS FADE-IN KEYFRAME ──────── */
  const style = document.createElement('style');
  style.textContent = '@keyframes fadeIn { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }';
  document.head.appendChild(style);

});
