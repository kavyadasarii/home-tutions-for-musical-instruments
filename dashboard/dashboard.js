
document.addEventListener('DOMContentLoaded', () => {

  
  const toastEl = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }

  
  const navItems = document.querySelectorAll('.dash-nav-item[data-target]');
  const panels = document.querySelectorAll('.dash-panel[data-panel]');
  const pageTitle = document.getElementById('page-title');
  const pageSub = document.getElementById('page-sub');
  const dashMain = document.getElementById('dash-main');
  const sidebar = document.getElementById('dash-sidebar');
  const scrim = document.getElementById('sidebar-scrim');

  const panelMeta = {
    overview:   { title: 'Overview', sub: "Welcome back, Ishaan. Here's where things stand with your Piano lessons this week." },
    book:       { title: 'Book a Lesson', sub: 'Reserve your weekly slot with an instructor — confirmed slots repeat automatically every week.' },
    schedule:   { title: 'My Schedule', sub: 'All of your upcoming and past sessions with Sneha, in one place.' },
    practice:   { title: 'Practice & Progress', sub: 'Assignments, skill progress and the notes Sneha leaves after every lesson.' },
    recordings: { title: 'Lesson Recordings', sub: 'Every session is recorded so you can rewatch and practice along at home.' },
    payments:   { title: 'Payments', sub: 'Review your fees, saved payment method and past receipts.' },
    profile:    { title: 'Profile', sub: 'Keep your contact details and lesson preferences up to date.' }
  };

  function openPanel(target) {
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
    navItems.forEach(n => n.classList.toggle('active', n.dataset.target === target));
    if (panelMeta[target]) {
      pageTitle.textContent = panelMeta[target].title;
      pageSub.textContent = panelMeta[target].sub;
    }
    dashMain.scrollTo({ top: 0, behavior: 'smooth' });
    closeSidebar();
  }

  navItems.forEach(item => item.addEventListener('click', () => openPanel(item.dataset.target)));

  // Any element anywhere (links inside cards, profile dropdown, etc.) with data-target jumps to that panel
  document.querySelectorAll('[data-target]').forEach(el => {
    if (el.classList.contains('dash-nav-item')) return; // already wired
    el.addEventListener('click', (e) => {
      const target = el.dataset.target;
      if (!panelMeta[target]) return;
      e.preventDefault();
      openPanel(target);
      closeDropdowns();
    });
  });

  
  const sidebarToggle = document.getElementById('sidebar-toggle');
  function closeSidebar() {
    sidebar.classList.remove('open');
    scrim.classList.remove('show');
  }
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      scrim.classList.toggle('show');
    });
  }
  if (scrim) scrim.addEventListener('click', closeSidebar);

  
  const notifBtn = document.getElementById('notif-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  const profileBtn = document.getElementById('profile-btn');
  const profileDropdown = document.getElementById('profile-dropdown');

  function closeDropdowns() {
    notifDropdown && notifDropdown.classList.remove('open');
    profileDropdown && profileDropdown.classList.remove('open');
    notifBtn && notifBtn.setAttribute('aria-expanded', 'false');
    profileBtn && profileBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown(btn, panel) {
    const isOpen = panel.classList.contains('open');
    closeDropdowns();
    if (!isOpen) {
      panel.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  if (notifBtn) notifBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(notifBtn, notifDropdown); });
  if (profileBtn) profileBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(profileBtn, profileDropdown); });
  document.addEventListener('click', closeDropdowns);
  notifDropdown && notifDropdown.addEventListener('click', e => e.stopPropagation());
  profileDropdown && profileDropdown.addEventListener('click', e => e.stopPropagation());

  const markRead = document.getElementById('mark-read');
  const notifBadge = document.getElementById('notif-badge');
  if (markRead) {
    markRead.addEventListener('click', () => {
      document.querySelectorAll('.notif-item.unread').forEach(i => i.classList.remove('unread'));
      if (notifBadge) notifBadge.style.display = 'none';
      showToast('All notifications marked as read.');
    });
  }

  
  function handleLogout() {
    closeDropdowns();
    showToast("You've been logged out.");
    setTimeout(() => { window.location.href = '../home/index.html'; }, 700);
  }
  document.getElementById('sidebar-logout')?.addEventListener('click', handleLogout);
  document.getElementById('profile-logout')?.addEventListener('click', handleLogout);

  
  function wireCheckable(selector, doneClass) {
    document.querySelectorAll(selector).forEach(item => {
      const chk = item.querySelector('.chk');
      if (!chk) return;
      chk.addEventListener('click', () => item.classList.toggle('done'));
    });
  }
  wireCheckable('.mini-check-item', 'done');
  wireCheckable('.assignment-card', 'done');

  const assignmentList = document.getElementById('assignment-list');
  const assignmentCount = document.getElementById('assignment-count');
  function updateAssignmentCount() {
    if (!assignmentList || !assignmentCount) return;
    const all = assignmentList.querySelectorAll('.assignment-card');
    const done = assignmentList.querySelectorAll('.assignment-card.done');
    assignmentCount.textContent = `${done.length} of ${all.length} done`;
  }
  if (assignmentList) {
    assignmentList.addEventListener('click', () => setTimeout(updateAssignmentCount, 0));
    updateAssignmentCount();
  }

  
  const tabBtns = document.querySelectorAll('.tab-btn[data-tab]');
  const upcomingList = document.getElementById('schedule-upcoming');
  const pastList = document.getElementById('schedule-past');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isUpcoming = btn.dataset.tab === 'upcoming';
      if (upcomingList) upcomingList.style.display = isUpcoming ? 'flex' : 'none';
      if (pastList) pastList.style.display = isUpcoming ? 'none' : 'flex';
    });
  });

  
  const slotTable = document.getElementById('slot-table');
  const currentSlotValue = document.getElementById('current-slot-value');
  const currentSlotBadge = document.getElementById('current-slot-badge');
  const bookInstructor = document.getElementById('book-instructor');

  if (slotTable) {
    slotTable.querySelectorAll('.slot-btn').forEach(btn => {
      if (btn.disabled) return;
      btn.addEventListener('click', () => {
        const wasMine = btn.classList.contains('booked-you');
        // clear any previous "mine" slot
        slotTable.querySelectorAll('.slot-btn.booked-you').forEach(b => {
          b.classList.remove('booked-you');
          b.dataset.mine = '';
          b.innerHTML = 'Open';
        });
        if (wasMine) {
          if (currentSlotValue) currentSlotValue.textContent = 'No weekly slot booked yet';
          if (currentSlotBadge) { currentSlotBadge.textContent = 'Not booked'; currentSlotBadge.className = 'badge badge-muted'; }
          showToast('Slot cancelled — it is open again for other students.');
          return;
        }
        const day = slotTable.querySelectorAll('thead th')[[...btn.closest('tr').children].indexOf(btn.closest('td'))]?.textContent || '';
        const time = btn.closest('tr').querySelector('.time-col')?.textContent || '';
        const instructor = bookInstructor ? bookInstructor.value : 'your instructor';
        btn.classList.add('booked-you');
        btn.dataset.mine = 'true';
        btn.innerHTML = `<span class="slot-name">${instructor}</span><span>Your slot</span>`;
        if (currentSlotValue) currentSlotValue.textContent = `${day} · ${time} · with ${instructor}`;
        if (currentSlotBadge) { currentSlotBadge.textContent = 'Requested'; currentSlotBadge.className = 'badge badge-muted'; }
        showToast(`Slot requested — ${instructor} will confirm within a day.`);
      });
    });
  }

  
  const videoModal = document.getElementById('video-modal');
  const videoTitle = document.getElementById('video-modal-title');
  const videoMeta = document.getElementById('video-modal-meta');
  document.querySelectorAll('.play-circle').forEach(btn => {
    btn.addEventListener('click', () => {
      videoTitle.textContent = btn.dataset.title || 'Lesson recording';
      videoMeta.textContent = btn.dataset.meta || '';
      videoModal.classList.add('open');
    });
  });
  document.getElementById('video-modal-close')?.addEventListener('click', () => videoModal.classList.remove('open'));
  videoModal?.addEventListener('click', (e) => { if (e.target === videoModal) videoModal.classList.remove('open'); });

  
  const payNowBtn = document.getElementById('pay-now-btn');
  const dueCard = document.getElementById('due-card');
  const dueAmt = document.getElementById('due-amt');
  const dueSub = document.getElementById('due-sub');
  if (payNowBtn) {
    payNowBtn.addEventListener('click', () => {
      dueCard.classList.add('paid');
      dueAmt.textContent = '₹0 due';
      dueSub.textContent = 'You\'re all paid up for September. Thank you!';
      payNowBtn.textContent = 'Paid';
      payNowBtn.disabled = true;
      showToast('Payment of ₹2,400 received — receipt sent to your email.');
    });
  }

  
  const editBtn = document.getElementById('edit-profile-btn');
  const saveBtn = document.getElementById('save-profile-btn');
  const profileForm = document.getElementById('profile-form');
  if (editBtn && profileForm) {
    editBtn.addEventListener('click', () => {
      profileForm.querySelectorAll('input, select').forEach(el => { if (el.id !== 'pf-instrument') el.disabled = false; });
      saveBtn.style.display = 'inline-flex';
      editBtn.style.display = 'none';
    });
  }
  if (saveBtn && profileForm) {
    saveBtn.addEventListener('click', () => {
      profileForm.querySelectorAll('input, select').forEach(el => el.disabled = true);
      saveBtn.style.display = 'none';
      editBtn.style.display = 'inline-flex';
      showToast('Profile updated.');
    });
  }
});
