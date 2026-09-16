// =======================================================================
// RAGA HOUSE — Auth page interactions (Login / Sign Up)
// =======================================================================

document.addEventListener('DOMContentLoaded', () => {

  
  document.querySelectorAll('.pw-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.for);
      if (!input) return;
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      btn.classList.toggle('showing', !showing);
      btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
    });
  });

  
  const toastEl = document.getElementById('toast');
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Logging you in…');
      setTimeout(() => { window.location.href = '../dashboard/dashboard.html'; }, 700);
    });
  }

  
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Account created — please log in.');
      setTimeout(() => { window.location.href = '../login/login.html'; }, 900);
    });
  }

  
  document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', () => showToast(`Continuing with ${btn.dataset.provider}…`));
  });
});
