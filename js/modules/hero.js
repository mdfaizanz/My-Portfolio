/* hero.js — letter-by-letter title + typing effect for the role line */
App.register('hero', function (root) {

  /* 1. Split the title into words → letters so CSS can animate each one */
  var title = App.$('[data-split]', root);
  if (title) {
    var text = title.textContent.trim();
    var index = 0;
    title.setAttribute('aria-label', text);
    title.textContent = '';

    text.split(/\s+/).forEach(function (word, w) {
      if (w > 0) title.appendChild(document.createTextNode(' '));
      var wordEl = App.el('span', { class: 'word', 'aria-hidden': 'true' });
      word.split('').forEach(function (ch) {
        wordEl.appendChild(App.el('span', { class: 'char', text: ch, style: { '--i': index++ } }));
      });
      title.appendChild(wordEl);
    });
  }

  /* 2. Typing effect */
  var typed = App.$('[data-typed]', root);
  var roles = App.get('profile.roles', []);
  if (!typed || !roles.length) return;

  if (App.prefersReducedMotion) {
    typed.textContent = roles[0];
    var caret = App.$('.caret', root);
    if (caret) caret.style.display = 'none';
    return;
  }

  var roleIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    var word = roles[roleIndex];
    charIndex += deleting ? -1 : 1;
    typed.textContent = word.slice(0, charIndex);

    var delay = deleting ? 35 : 70;
    if (!deleting && charIndex === word.length) { deleting = true; delay = 1700; }
    else if (deleting && charIndex === 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 350; }
    setTimeout(tick, delay);
  }
  setTimeout(tick, 1100); // wait for the title animation
});
