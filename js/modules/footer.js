/* footer.js — current year + social links (from js/data.js → socials) */
App.register('footer', function (root) {
  var year = App.$('[data-footer-year]', root);
  if (year) year.textContent = new Date().getFullYear();

  var list = App.$('[data-footer-socials]', root);
  if (list) App.get('socials', []).forEach(function (s) {
    list.appendChild(App.el('li', {}, [
      App.el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.label })
    ]));
  });
});
