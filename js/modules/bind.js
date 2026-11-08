/* bind.js — fills  <el data-bind="profile.name">  from js/data.js */
App.register('bind', function () {
  App.$$('[data-bind]').forEach(function (el) {
    var value = App.get(el.getAttribute('data-bind'));
    if (value == null) return;
    el.textContent = value;
    if (el.hasAttribute('data-bind-mailto')) el.href = 'mailto:' + value;
  });
}, { global: true });
