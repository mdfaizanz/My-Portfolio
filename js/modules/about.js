/* about.js — renders the About section from js/data.js → about
   Each block below is independent: delete its container in index.html and it's skipped. */
App.register('about', function (root) {
  var data = App.get('about');
  if (!data) return;

  var stagger = function (i, step) { return (i * (step || 90)) + 'ms'; };

  /* ----- Intro paragraphs ----- */
  var textBox = App.$('[data-about-text]', root);
  if (textBox) (data.paragraphs || []).forEach(function (p) { textBox.appendChild(App.el('p', { text: p })); });

  /* ----- Stats (count up) ----- */
  var statsBox = App.$('[data-about-stats]', root);
  if (statsBox) (data.stats || []).forEach(function (s, i) {
    statsBox.appendChild(App.el('li', { class: 'stat', 'data-reveal': '', style: { '--delay': stagger(i) } }, [
      App.el('b', { 'data-count': s.value, 'data-suffix': s.suffix || '', text: '0' + (s.suffix || '') }),
      App.el('span', { text: s.label })
    ]));
  });

  /* ----- Language rings ----- */
  var ringsBox = App.$('[data-about-languages]', root);
  if (ringsBox) (data.languages || []).forEach(function (l, i) {
    var svg = App.svg('svg', { viewBox: '0 0 100 100', 'aria-hidden': 'true' }, [
      App.svg('circle', { class: 'ring__track', cx: 50, cy: 50, r: 44 }),
      App.svg('circle', { class: 'ring__bar',   cx: 50, cy: 50, r: 44, pathLength: 100 })
    ]);
    ringsBox.appendChild(App.el('li', {
      class: 'ring', 'data-reveal': '',
      style: { '--delay': stagger(i, 140), '--off': 100 - l.level }
    }, [
      App.el('div', { class: 'ring__chart' }, [
        svg,
        App.el('span', { class: 'ring__value', 'data-count': l.level, 'data-suffix': '%', text: '0%' })
      ]),
      App.el('span', { class: 'ring__name', text: l.name }),
      App.el('span', { class: 'ring__note', text: l.note || '' })
    ]));
  });

  /* ----- Skill groups with animated bars ----- */
  var skillsBox = App.$('[data-about-skills]', root);
  if (skillsBox) (data.skills || []).forEach(function (g, gi) {
    var items = (g.items || []).map(function (s, si) {
      return App.el('li', { class: 'skill', style: { '--level': s.level / 100, '--i': si } }, [
        App.el('div', { class: 'skill__top' }, [
          App.el('span', { text: s.name }),
          App.el('span', { text: s.level + '%' })
        ]),
        App.el('div', { class: 'skill__bar' }, [App.el('i', { class: 'skill__fill' })])
      ]);
    });
    skillsBox.appendChild(App.el('div', { class: 'skill-group', 'data-reveal': '', style: { '--delay': stagger(gi, 140) } }, [
      App.el('h4', {}, [g.group, g.tag ? App.el('small', { text: g.tag }) : null]),
      App.el('ul', {}, items)
    ]));
  });

  /* ----- Tool chips ----- */
  var chipsBox = App.$('[data-about-tools]', root);
  if (chipsBox) (data.tools || []).forEach(function (t, i) {
    chipsBox.appendChild(App.el('li', { class: 'chip', 'data-reveal': '', style: { '--delay': stagger(i, 55) }, text: t }));
  });
});
