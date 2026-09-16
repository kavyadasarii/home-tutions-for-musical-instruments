// =======================================================================
// RAGA HOUSE — site interactions
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('ragahouse-theme', next);
    });
    const savedTheme = localStorage.getItem('ragahouse-theme');
    if (savedTheme) root.setAttribute('data-theme', savedTheme);
  }

  
  const dirToggle = document.getElementById('dir-toggle');
  if (dirToggle) {
    dirToggle.addEventListener('click', () => {
      const next = root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      root.setAttribute('dir', next);
      localStorage.setItem('ragahouse-dir', next);
    });
  }
  const savedDir = localStorage.getItem('ragahouse-dir');
  if (savedDir) root.setAttribute('dir', savedDir);

  
  const menuToggle = document.getElementById('menu-toggle');
  const mobilePanel = document.getElementById('mobile-panel');
  if (menuToggle && mobilePanel) {
    menuToggle.addEventListener('click', () => mobilePanel.classList.toggle('open'));
    mobilePanel.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobilePanel.classList.remove('open'))
    );
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) mobilePanel.classList.remove('open');
    });
  }

  
  const trialForm = document.querySelector('.trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fine = trialForm.querySelector('.form-fine');
      if (fine) fine.textContent = 'Thanks — a teacher will call you shortly.';
    });
  }
});
