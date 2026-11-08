/* =========================================================
   core.js — the tiny toolkit every module shares.
   Nothing else is global: everything hangs off `window.App`.

   How modules work
   ----------------
   Each file in js/modules/ calls  App.register('name', init).
   `init` only runs if the page contains  data-module="name".
   So to REMOVE a feature, delete its <section> in index.html
   (and optionally its <script> + CSS link) — nothing else breaks.
   A module that throws an error never stops the others.
   ========================================================= */
(function () {
  'use strict';

  var App = (window.App = window.App || {});
  var registry = [];

  App.data = App.data || {};
  App.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- DOM helpers ---------- */
  App.$  = function (sel, root) { return (root || document).querySelector(sel); };
  App.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /** Create an element: App.el('div', { class: 'x', text: 'hi', style: { '--i': 2 } }, [children]) */
  App.el = function (tag, props, kids) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (key) {
      var val = props[key];
      if (val == null || val === false) return;
      if (key === 'class') node.className = val;
      else if (key === 'text') node.textContent = val;
      else if (key === 'style') Object.keys(val).forEach(function (p) { node.style.setProperty(p, val[p]); });
      else node.setAttribute(key, val === true ? '' : val);
    });
    [].concat(kids == null ? [] : kids).forEach(function (child) {
      if (child == null) return;
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return node;
  };

  /** Create an SVG element */
  App.svg = function (tag, attrs, kids) {
    var node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (c) { node.appendChild(c); });
    return node;
  };

  /* ---------- Data + storage ---------- */
  /** App.get('profile.name', 'fallback') — safe lookup into js/data.js */
  App.get = function (path, fallback) {
    var val = path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, App.data);
    return val == null ? fallback : val;
  };

  /** localStorage that never throws (private mode, blocked storage…) */
  App.store = {
    get: function (key, fallback) { try { var v = localStorage.getItem(key); return v == null ? fallback : v; } catch (e) { return fallback; } },
    set: function (key, value) { try { localStorage.setItem(key, String(value)); } catch (e) { /* ignore */ } }
  };

  /* ---------- Count-up numbers: <b data-count="90" data-suffix="%"> ---------- */
  App.countUp = function (el) {
    if (el._counted) return;
    el._counted = true;
    var target = parseFloat(el.getAttribute('data-count')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (App.prefersReducedMotion) { el.textContent = target + suffix; return; }
    var start = null, duration = 1600;
    (function tick(now) {
      if (start === null) start = now;
      var p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(performance.now());
  };

  /* ---------- Module registry ---------- */
  /**
   * App.register(name, init, { global: true })
   *  - normal modules get their  [data-module="name"]  element as `root`
   *  - `global` modules (bind, theme, reveal) run on the whole document
   */
  App.register = function (name, init, opts) {
    registry.push({ name: name, init: init, global: !!(opts && opts.global) });
  };

  App.start = function () {
    registry.forEach(function (m) {
      var root = m.global ? document : App.$('[data-module="' + m.name + '"]');
      if (!root) return; // section removed from the page → skip quietly
      try { m.init(root); }
      catch (err) { console.error('[' + m.name + '] module failed:', err); }
    });
  };
})();
