
document.addEventListener('DOMContentLoaded', () => {

  
  const billingToggle = document.querySelector('.billing-toggle');
  if (billingToggle) {
    const buttons = billingToggle.querySelectorAll('button');
    const priceEls = document.querySelectorAll('.price-amount .num');
    const noteEls = document.querySelectorAll('.price-billed-note');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cycle = btn.dataset.cycle;
        priceEls.forEach(el => { el.textContent = el.dataset[cycle]; });
        noteEls.forEach(el => { el.textContent = el.dataset[cycle + 'Note']; });
      });
    });
  }

  
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fine = contactForm.querySelector('.form-fine');
      if (fine) fine.textContent = "Thanks — we'll get back to you within one business day.";
    });
  }
});
