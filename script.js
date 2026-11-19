(function () {
  var root = document.documentElement;
  var themeMeta = document.querySelectorAll('meta[name="theme-color"]');

  function save(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  // Idioma
  var langButtons = document.querySelectorAll('[data-set-lang]');

  function applyLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.title = 'José Neto';
    langButtons.forEach(function (b) {
      b.setAttribute('aria-current', String(b.dataset.setLang === lang));
    });
    var toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.setAttribute('aria-label', lang === 'en' ? 'Toggle theme' : 'Alternar tema');
  }

  langButtons.forEach(function (b) {
    b.addEventListener('click', function () {
      applyLang(b.dataset.setLang);
      save('lang', b.dataset.setLang);
    });
  });

  applyLang(root.dataset.lang === 'en' ? 'en' : 'pt');

  // Tema
  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function syncThemeMeta() {
    var color = currentTheme() === 'dark' ? '#0f0f0f' : '#ffffff';
    themeMeta.forEach(function (m) {
      m.setAttribute('content', color);
    });
  }

  document.getElementById('theme-toggle').addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    save('theme', next);
    syncThemeMeta();
  });

  if (root.dataset.theme) syncThemeMeta();
})();
