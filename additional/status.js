
document.addEventListener('DOMContentLoaded', () => {
  const toastEl = document.getElementById('toast');
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2800);
  }

  const notifyForm = document.getElementById('notify-form');
  if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('notify-email');
      showToast("Thanks — we'll email you the moment it's ready.");
      if (input) input.value = '';
    });
  }
});
