/* =========================================================
   picker.js — chooses the next random picture.
   Rules: never the same category twice in a row, and no picture
   repeats until every picture has been shown once.
   ========================================================= */
(function () {
  var P = App.puzzle;
  var seen = {};          // "category:index" → true
  var lastCategory = null;

  function rand(n) { return Math.floor(Math.random() * n); }
  function key(cat, i) { return cat.id + ':' + i; }
  function unseen(cat) { return cat.items.map(function (_, i) { return i; }).filter(function (i) { return !seen[key(cat, i)]; }); }

  /** Returns { category, emoji, name, key } */
  P.pick = function () {
    var lib = P.library;
    var cats = lib.filter(function (c) { return c.id !== lastCategory && unseen(c).length; });

    if (!cats.length) {                       // everything shown → start a new round
      seen = {};
      cats = lib.filter(function (c) { return c.id !== lastCategory; });
      if (!cats.length) cats = lib.slice();
    }

    var cat = cats[rand(cats.length)];
    var pool = unseen(cat);
    var index = pool[rand(pool.length)];

    seen[key(cat, index)] = true;
    lastCategory = cat.id;
    return { category: cat, emoji: cat.items[index][0], name: cat.items[index][1], key: key(cat, index) };
  };
})();
