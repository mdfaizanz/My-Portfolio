/* main.js — starts every registered module (see core.js) */
(function () {
  function boot() {
    App.start();
    document.documentElement.classList.add('is-ready');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
