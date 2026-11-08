/* =========================================================
   game.js — the 5×5 swap puzzle.
   Needs library.js, picker.js and picture.js (loaded before this file).

   Rules: click a tile, click another → they swap. A tile that lands in
   its correct place locks. Finish the picture → result card → a new
   random picture (automatically or with the Next button).
   Settings (grid size, auto-next delay): js/data.js → puzzle
   ========================================================= */
App.register('puzzle', function (root) {
  var P = App.puzzle;
  if (!P || !P.pick || !P.render) { console.warn('[puzzle] helper files are missing'); return; }

  var cfg = Object.assign({ size: 5, autoNextSeconds: 6 }, App.get('puzzle', {}));
  var N = cfg.size, TOTAL = N * N;

  /* ----- elements (all optional except the board) ----- */
  var q = function (s) { return App.$(s, root); };
  var ui = {
    board: q('[data-puzzle-board]'),   peek: q('[data-puzzle-peek]'),   overlay: q('[data-puzzle-overlay]'),
    category: q('[data-puzzle-category]'), moves: q('[data-puzzle-moves]'), time: q('[data-puzzle-time]'),
    solved: q('[data-puzzle-solved]'), bar: q('[data-puzzle-bar]'),     placed: q('[data-puzzle-placed]'),
    total: q('[data-puzzle-total]'),   peekBtn: q('[data-puzzle-peek-btn]'), hintBtn: q('[data-puzzle-hint]'),
    skipBtn: q('[data-puzzle-skip]'),  nextBtn: q('[data-puzzle-next]'),
    rEmoji: q('[data-result-emoji]'),  rTitle: q('[data-result-title]'), rMeta: q('[data-result-meta]'), rCount: q('[data-result-count]')
  };
  if (!ui.board) return;

  function text(el, value) { if (el) el.textContent = value; }

  /* ----- state ----- */
  var order = [];            // order[position] = tile id   (tile id = its correct position)
  var tiles = [];            // tiles[id] = <button>
  var selected = null;       // selected tile id
  var moves = 0, startedAt = 0, ticker = 0, countdown = 0, timeouts = [];
  var active = false, current = null;
  var solvedCount = parseInt(App.store.get('puzzle.solved', '0'), 10) || 0;

  function later(fn, ms) { var id = setTimeout(fn, ms); timeouts.push(id); return id; }
  function clearTimers() {
    timeouts.forEach(clearTimeout); timeouts = [];
    clearInterval(ticker); clearInterval(countdown); ticker = countdown = 0;
  }
  function fmt(sec) { sec = Math.floor(sec); var m = Math.floor(sec / 60), s = sec % 60; return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s; }

  /* ----- setup ----- */
  function scramble() {                         // random order where no tile starts in place
    var a, ok;
    do {
      a = []; for (var i = 0; i < TOTAL; i++) a.push(i);
      for (i = TOTAL - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
      ok = a.every(function (v, k) { return v !== k; });
    } while (!ok);
    return a;
  }

  function buildTiles() {
    ui.board.innerHTML = '';
    tiles = [];
    for (var id = 0; id < TOTAL; id++) {
      var tile = App.el('button', { class: 'tile', type: 'button', style: { '--tx': id % N, '--ty': Math.floor(id / N) } });
      tile.addEventListener('click', onTile.bind(null, id));
      tiles.push(tile);
      ui.board.appendChild(tile);
    }
  }

  function newPuzzle() {
    clearTimers();
    current = P.pick();
    var url = P.render(current, 800);

    ui.board.style.setProperty('--n', N);
    ui.board.style.setProperty('--img', 'url("' + url + '")');
    if (ui.peek) { ui.peek.style.backgroundImage = 'url("' + url + '")'; ui.peek.classList.remove('is-on'); }
    ui.board.classList.remove('is-solved');
    if (ui.overlay) ui.overlay.classList.remove('is-open');

    order = scramble();
    buildTiles();
    moves = 0; selected = null; startedAt = 0; active = true;

    text(ui.moves, 0); text(ui.time, '00:00'); text(ui.total, TOTAL);
    text(ui.category, current.category.label); text(ui.solved, solvedCount);
    layout();
  }

  /* ----- drawing the current order ----- */
  function layout() {
    var placed = 0;
    for (var pos = 0; pos < TOTAL; pos++) {
      var id = order[pos], tile = tiles[id], ok = id === pos;
      var row = Math.floor(pos / N), col = pos % N;
      tile.style.setProperty('--c', col);
      tile.style.setProperty('--r', row);
      tile.classList.toggle('is-locked', ok);
      tile.setAttribute('aria-disabled', String(ok));
      tile.setAttribute('aria-label', 'Row ' + (row + 1) + ', column ' + (col + 1) + (ok ? ', in place' : ''));
      if (ok) placed++;
    }
    text(ui.placed, placed);
    if (ui.bar) ui.bar.style.transform = 'scaleX(' + (placed / TOTAL) + ')';
    return placed;
  }

  /* ----- playing ----- */
  function onTile(id) {
    if (!active) return;
    if (order.indexOf(id) === id) return;                        // locked tile
    if (!startedAt) startTimer();
    if (selected === null) return select(id);
    if (selected === id) return select(null);
    swap(selected, id);
  }

  function select(id) {
    if (selected !== null && tiles[selected]) tiles[selected].classList.remove('is-selected');
    selected = id;
    if (id !== null) tiles[id].classList.add('is-selected');
  }

  function swap(a, b) {
    var pa = order.indexOf(a), pb = order.indexOf(b);
    order[pa] = b; order[pb] = a;
    moves++; text(ui.moves, moves);
    select(null);
    if (layout() === TOTAL) solve();
  }

  function startTimer() {
    startedAt = Date.now();
    ticker = setInterval(function () { text(ui.time, fmt((Date.now() - startedAt) / 1000)); }, 250);
  }

  /* ----- finishing ----- */
  function solve() {
    active = false;
    var secs = (Date.now() - startedAt) / 1000;
    clearInterval(ticker); ticker = 0;
    text(ui.time, fmt(secs));

    solvedCount++;
    App.store.set('puzzle.solved', solvedCount);
    text(ui.solved, solvedCount);

    ui.board.classList.add('is-solved');
    text(ui.rEmoji, current.emoji);
    text(ui.rTitle, current.name + ' — solved!');
    text(ui.rMeta, moves + ' moves · ' + fmt(secs));

    later(showResult, 1000);     // let the picture shine first
  }

  function showResult() {
    if (ui.overlay) ui.overlay.classList.add('is-open');
    var left = cfg.autoNextSeconds;
    if (left > 0) {
      text(ui.rCount, '(' + left + ')');
      countdown = setInterval(function () {
        left--;
        if (left <= 0) newPuzzle(); else text(ui.rCount, '(' + left + ')');
      }, 1000);
    } else text(ui.rCount, '');
    if (ui.nextBtn) ui.nextBtn.focus({ preventScroll: true });
  }

  /* ----- helpers: hint / peek / skip ----- */
  function hint() {
    if (!active) return;
    var wrong = [];
    for (var pos = 0; pos < TOTAL; pos++) if (order[pos] !== pos) wrong.push(pos);
    if (!wrong.length) return;
    var target = wrong[Math.floor(Math.random() * wrong.length)];
    [tiles[target], tiles[order[target]]].forEach(function (tile) {   // the tile that belongs here + the one sitting here
      tile.classList.add('is-hint');
      later(function () { tile.classList.remove('is-hint'); }, 1600);
    });
  }

  function peek(on) { if (ui.peek) ui.peek.classList.toggle('is-on', on); }

  if (ui.peekBtn) {
    ui.peekBtn.addEventListener('pointerdown', function (e) { e.preventDefault(); peek(true); });
    ['pointerup', 'pointerleave', 'pointercancel', 'blur', 'keyup'].forEach(function (ev) {
      ui.peekBtn.addEventListener(ev, function () { peek(false); });
    });
    ui.peekBtn.addEventListener('keydown', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); peek(true); } });
    ui.peekBtn.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }
  if (ui.hintBtn) ui.hintBtn.addEventListener('click', hint);
  if (ui.skipBtn) ui.skipBtn.addEventListener('click', newPuzzle);
  if (ui.nextBtn) ui.nextBtn.addEventListener('click', newPuzzle);

  newPuzzle();
});
