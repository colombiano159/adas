/* UltraWrap Studio — site interactions
   Kept intentionally small: no frameworks, no dependencies. */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        links.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll('.reveal, .reveal-stagger');
  if (revealables.length && 'IntersectionObserver' in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Before / after sliders ---------- */
  document.querySelectorAll('[data-ba]').forEach(function (ba) {
    var after = ba.querySelector('.ba-after');
    var handle = ba.querySelector('.ba-handle');
    var range = ba.querySelector('.ba-range');
    if (!after || !handle || !range) return;
    var set = function (pct) {
      pct = Math.max(0, Math.min(100, pct));
      after.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
      handle.style.left = pct + '%';
    };
    range.addEventListener('input', function () { set(parseFloat(range.value)); });
    set(50);
  });

  /* ---------- Portfolio filter ---------- */
  var filterBar = document.querySelector('[data-filterbar]');
  var workGrid = document.querySelector('[data-workgrid]');
  if (filterBar && workGrid) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      var f = btn.dataset.filter;
      workGrid.querySelectorAll('.work-card').forEach(function (card) {
        var cats = (card.dataset.cat || '').split(/\s+/);
        card.classList.toggle('is-hidden', f !== 'all' && cats.indexOf(f) === -1);
      });
    });
  }

  /* ---------- Marquee: duplicate track content for seamless loop ---------- */
  document.querySelectorAll('[data-marquee]').forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Simple contact form (demo mode until [FORM_ENDPOINT] is connected) ---------- */
  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = contactForm.querySelector('[data-form-error]');
      if (!contactForm.checkValidity()) {
        if (err) err.classList.add('is-visible');
        return;
      }
      if (err) err.classList.remove('is-visible');
      contactForm.hidden = true;
      var ok = document.querySelector('[data-form-success]');
      if (ok) {
        ok.hidden = false;
        ok.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' });
      }
    });
  }
})();
