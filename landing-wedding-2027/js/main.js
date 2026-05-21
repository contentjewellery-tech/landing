function getCopy(path) {
  return path.split('.').reduce((acc, key) => acc && acc[key], window.COPY);
}

function hydrateCopy() {
  document.querySelectorAll('[data-copy]').forEach((el) => {
    const value = getCopy(el.dataset.copy);
    if (typeof value !== 'undefined') {
      el.textContent = value;
    }
  });
}

function initTheme() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const KEY = 'fgm-2027-theme';

  function getEffectiveTheme() {
    const stored = localStorage.getItem(KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  applyTheme(getEffectiveTheme());

  toggle.addEventListener('click', () => {
    const next = getEffectiveTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem(KEY, next);
    applyTheme(next);
  });

  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem(KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  hydrateCopy();
  initTheme();
  initSmoothScroll();
});
