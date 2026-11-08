/* reveal.js — fades elements in when they scroll into view.
   Any element with  data-reveal  is animated; add  style="--delay:200ms"  to stagger.
   Must be loaded LAST so it can see everything the other modules rendered. */
App.register('reveal', function () {
  var items = App.$$('[data-reveal]');

  function show(el) {
    el.classList.add('is-visible');
    if (el.hasAttribute('data-count')) App.countUp(el);
    App.$$('[data-count]', el).forEach(App.countUp);
  }

  if (!('IntersectionObserver' in window) || App.prefersReducedMotion) { items.forEach(show); return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      show(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  items.forEach(function (el) { io.observe(el); });
}, { global: true });
