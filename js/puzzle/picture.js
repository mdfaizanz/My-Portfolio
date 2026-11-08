/* =========================================================
   picture.js — paints a simple puzzle picture on a canvas.

   App.puzzle.render(pick, size) → "data:image/jpeg;base64,…"
   ========================================================= */
(function () {
  var P = App.puzzle;
  var EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Twemoji Mozilla",sans-serif';

  P.render = function (pick, S) {
    S = S || 800;
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = S;
    var g = canvas.getContext('2d');
    var hue = pick.category.hue;
    var background = g.createLinearGradient(0, 0, 0, S);
    background.addColorStop(0, 'hsl(' + hue + ',48%,78%)');
    background.addColorStop(1, 'hsl(' + (hue + 24) + ',52%,58%)');
    g.fillStyle = background;
    g.fillRect(0, 0, S, S);

    g.fillStyle = 'rgba(255,255,255,.3)';
    g.beginPath();
    g.arc(S * 0.5, S * 0.43, S * 0.28, 0, Math.PI * 2);
    g.fill();

    g.font = S * 0.42 + 'px ' + EMOJI_FONT;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(pick.emoji, S * 0.5, S * 0.43);

    g.fillStyle = '#fff';
    g.font = '700 ' + Math.round(S * 0.06) + 'px Inter, system-ui, sans-serif';
    g.fillText(pick.name, S * 0.5, S * 0.82, S * 0.84);

    return canvas.toDataURL('image/jpeg', 0.92);
  };
})();
