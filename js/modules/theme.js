/* theme.js — dark / light toggle (remembers the choice) */
App.register('theme', function () {
  var btn = App.$('[data-theme-toggle]');
  if (!btn) return;

  var html = document.documentElement;
  var meta = App.$('meta[name="theme-color"]');

  function apply(theme) {
    html.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', theme === 'light');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#fafafa' : '#0a0a0a');
  }

  apply(html.getAttribute('data-theme') || 'dark');

  btn.addEventListener('click', function () {
    var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    App.store.set('theme', next);
  });
}, { global: true });
