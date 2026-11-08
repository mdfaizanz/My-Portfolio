/* projects.js — top tabs + project cards. Content lives in js/data.js → projects */
App.register('projects', function (root) {
  var cfg       = App.get('projects');
  var tabsEl    = App.$('[data-projects-tabs]', root);
  var grid      = App.$('[data-projects-grid]', root);
  var indicator = App.$('[data-projects-indicator]', root);
  if (!cfg || !tabsEl || !grid || !cfg.tabs || !cfg.tabs.length) return;

  var tabs = cfg.tabs, items = cfg.items || [];
  var buttons = [], activeId = tabs[0].id, swapTimer;

  function inTab(project, id) { return (project.categories || []).indexOf(id) !== -1; }

  /* ----- Tabs ----- */
  tabs.forEach(function (t) {
    var count = items.filter(function (p) { return inTab(p, t.id); }).length;
    var btn = App.el('button', {
      class: 'tab', type: 'button', role: 'tab', id: 'tab-' + t.id,
      'aria-selected': 'false', tabindex: '-1'
    }, [t.label, App.el('sup', { text: String(count) })]);

    btn.addEventListener('click', function () { select(t.id); });
    btn.addEventListener('keydown', onKey);
    tabsEl.appendChild(btn);
    buttons.push(btn);
  });

  function onKey(e) {
    var i = buttons.indexOf(e.currentTarget), next = null;
    if (e.key === 'ArrowRight') next = i + 1;
    else if (e.key === 'ArrowLeft') next = i - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = buttons.length - 1;
    if (next === null) return;
    e.preventDefault();
    next = (next + buttons.length) % buttons.length;
    buttons[next].focus();
    select(tabs[next].id);
  }

  function moveIndicator() {
    var current = buttons[tabs.map(function (t) { return t.id; }).indexOf(activeId)];
    if (!current || !indicator) return;
    indicator.style.width = current.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + current.offsetLeft + 'px)';
  }

  function select(id, first) {
    if (!first && id === activeId) return;
    activeId = id;
    buttons.forEach(function (b, i) {
      var on = tabs[i].id === id;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    grid.setAttribute('aria-labelledby', 'tab-' + id);
    moveIndicator();
    render(first);
  }

  /* ----- Cards ----- */
  function initials(title) {
    return title.split(/\s+/).map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase();
  }

  function link(label, url) {
    if (!url) return null;
    return App.el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: label + ' ↗' });
  }

  function card(p, i) {
    var media = App.el('div', { class: 'card__media' });
    if (p.image) media.appendChild(App.el('img', { src: p.image, alt: p.title, loading: 'lazy' }));
    else media.appendChild(App.el('span', { class: 'card__glyph', text: initials(p.title) }));
    if (p.status === 'building') {
      media.appendChild(App.el('span', { class: 'badge' }, [App.el('i', { class: 'pulse-dot' }), 'In progress']));
    }

    var links = p.links || {};
    var body = App.el('div', { class: 'card__body' }, [
      App.el('h3', { text: p.title }),
      App.el('p', { text: p.description }),
      App.el('ul', { class: 'card__stack' }, (p.stack || []).map(function (s) { return App.el('li', { text: s }); })),
      App.el('div', { class: 'card__links' }, [link('Live demo', links.live), link('Source', links.code)])
    ]);

    return App.el('article', { class: 'card', 'data-reveal': '', style: { '--delay': (i % 3) * 90 + 'ms' } },
      [App.el('div', { class: 'card__box' }, [media, body])]);
  }

  function render(first) {
    var list = items.filter(function (p) { return inTab(p, activeId); });

    function paint() {
      grid.innerHTML = '';
      if (!list.length) {
        grid.appendChild(App.el('p', { class: 'cards__empty', text: 'Nothing here yet — check back soon.' }));
        return;
      }
      list.forEach(function (p, i) { grid.appendChild(card(p, i)); });
      // First paint is revealed on scroll (reveal.js). Later tab switches reveal right away.
      if (!first) requestAnimationFrame(function () { requestAnimationFrame(function () {
        App.$$('.card', grid).forEach(function (c) { c.classList.add('is-visible'); });
      }); });
    }

    if (first) return paint();
    grid.classList.add('is-leaving');
    clearTimeout(swapTimer);
    swapTimer = setTimeout(function () { paint(); grid.classList.remove('is-leaving'); }, 220);
  }

  select(activeId, true);
  window.addEventListener('resize', moveIndicator);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveIndicator);
});
