/* nav.js — scroll progress bar, mobile menu, active link highlight */
App.register('nav', function (header) {
  var bar    = App.$('[data-nav-progress]', header);
  var burger = App.$('[data-nav-toggle]', header);
  var links  = App.$$('.nav__links a', header);

  /* Scroll progress + "scrolled" background */
  function onScroll() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
    header.classList.toggle('is-scrolled', h.scrollTop > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  function setOpen(open) {
    header.classList.toggle('is-open', open);
    if (burger) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }
  if (burger) burger.addEventListener('click', function () { setOpen(!header.classList.contains('is-open')); });
  links.forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

  /* Highlight the link of the section in the middle of the screen */
  if (!('IntersectionObserver' in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (l) { l.classList.remove('is-active'); });
      if (byId[entry.target.id]) byId[entry.target.id].classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  var ids = Object.keys(byId).concat('home');
  ids.forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
});
