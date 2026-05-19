// ─── BNRG Games Portal Logic ───
document.addEventListener('DOMContentLoaded', () => {

  // ─── Toast Notification ───
  const toast = document.createElement('div');
  toast.className = 'download-toast';
  document.body.appendChild(toast);

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Track download clicks
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
      const fileName = link.getAttribute('download') || link.href.split('/').pop();
      showToast(`⬇ Downloading ${fileName}...`);
    });
  });

  // ─── Modal System ───
  const modalOverlay = document.getElementById('appModal');
  const modalClose = document.getElementById('modalClose');

  const appData = {
    'flappy-bird': {
      name: 'Flappy Bird',
      developer: 'BNRG Studios',
      description: 'The legendary arcade game reimagined! Navigate through pipes, beat your high score, and challenge your friends. Simple to play, impossible to master. Tap to fly and dodge the pipes!',
      downloads: '10K+',
      size: '574 KB',
      version: '1.0.0',
      bannerGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      apkFile: 'apks/flappy-bird.apk.apk',
      icon: '🐦'
    }
  };

  // Open modal
  document.querySelectorAll('[data-app]').forEach(btn => {
    btn.addEventListener('click', () => {
      const appId = btn.dataset.app;
      const app = appData[appId];
      if (!app) return;

      const banner = document.getElementById('modalBanner');
      banner.style.background = app.bannerGradient;
      banner.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:5rem;opacity:0.4">${app.icon}</div>`;

      document.getElementById('modalTitle').textContent = app.name;
      document.getElementById('modalDev').textContent = `by ${app.developer} • v${app.version}`;
      document.getElementById('modalDesc').textContent = app.description;
      document.getElementById('modalDownloads').textContent = app.downloads;
      document.getElementById('modalSize').textContent = app.size;

      const actions = document.getElementById('modalActions');
      actions.innerHTML = `
        <a href="${app.apkFile}" download="flappy-bird.apk" class="btn btn-primary modal-download-btn" style="flex:1;">⬇ Download APK</a>
      `;

      // Attach toast to modal download button
      actions.querySelector('.modal-download-btn').addEventListener('click', () => {
        showToast(`⬇ Downloading ${app.name}.apk...`);
      });

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ─── Scroll Reveal Animation ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.app-card, .about-feature').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.5s ease ${i * 0.1}s`;
    observer.observe(el);
  });
});
