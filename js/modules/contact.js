/* contact.js — form validation + sending
   • If js/data.js → contact.endpoint is set, the message is POSTed there (Formspree etc.)
   • Otherwise it opens the visitor's email app with the message filled in */
App.register('contact', function (root) {
  var form   = App.$('[data-contact-form]', root);
  if (!form) return;
  var status = App.$('[data-form-status]', form);
  var button = App.$('[data-form-submit]', form);

  var rules = {
    name:    function (v) { return v.trim().length >= 2 || 'Please tell me your name.'; },
    email:   function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'That email doesn’t look right.'; },
    message: function (v) { return v.trim().length >= 10 || 'A few more words, please (10+ characters).'; }
  };

  function setStatus(msg, ok) {
    if (!status) return;
    status.textContent = msg || '';
    status.classList.toggle('is-ok', !!ok);
  }

  function validate(name) {
    var input = form.elements[name];
    var field = input.closest('.field');
    var result = rules[name](input.value);
    var error = App.$('[data-error-for="' + name + '"]', form);

    if (error) error.textContent = result === true ? '' : result;
    if (field) {
      field.classList.remove('has-error');
      if (result !== true) { void field.offsetWidth; field.classList.add('has-error'); } // restart shake
    }
    return result === true;
  }

  Object.keys(rules).forEach(function (name) {
    var input = form.elements[name];
    input.addEventListener('blur', function () { if (input.value) validate(name); });
    input.addEventListener('input', function () {
      var field = input.closest('.field');
      if (field && field.classList.contains('has-error')) validate(name);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setStatus('');

    // Spam trap: bots fill the hidden field, humans never see it
    if (form.elements.company && form.elements.company.value) { form.reset(); setStatus('Thanks! Message sent.', true); return; }

    var valid = Object.keys(rules).map(validate).every(Boolean);
    if (!valid) {
      var firstBad = App.$('.field.has-error input, .field.has-error textarea', form);
      if (firstBad) firstBad.focus();
      return;
    }

    var payload = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      message: form.elements.message.value.trim()
    };
    var endpoint = App.get('contact.endpoint', '');

    if (!endpoint) return sendByMail(payload);

    button.disabled = true;
    button.classList.add('is-loading');
    setStatus('Sending…');

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { if (!res.ok) throw new Error('Request failed'); })
      .then(function () { form.reset(); setStatus('Thanks! Your message is on its way.', true); })
      .catch(function () { setStatus('Something went wrong — please email me directly instead.'); })
      .then(function () { button.disabled = false; button.classList.remove('is-loading'); });
  });

  function sendByMail(p) {
    var to = App.get('profile.email', '');
    var subject = encodeURIComponent('Portfolio message from ' + p.name);
    var body = encodeURIComponent(p.message + '\n\n— ' + p.name + ' (' + p.email + ')');
    setStatus('Opening your email app…', true);
    window.location.href = 'mailto:' + to + '?subject=' + subject + '&body=' + body;
  }
});
