(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced.matches) {
    document.documentElement.classList.add('js');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    targets.forEach(target => observer.observe(target));
    reduced.addEventListener?.('change', event => { if (event.matches) { observer.disconnect(); document.documentElement.classList.remove('js'); } });
  }
  const progress = document.querySelector('.reading-progress');
  let scheduled = false;
  const update = () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`; scheduled = false; };
  addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update); update();
  const dialog = document.querySelector('.lightbox');
  const image = dialog.querySelector('img');
  document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
    if (!dialog.showModal) { window.open(button.dataset.image, '_blank', 'noopener'); return; }
    const source = button.querySelector('img'); image.src = button.dataset.image; image.alt = source.alt;
    dialog.querySelector('p').textContent = button.closest('figure').querySelector('figcaption span').textContent;
    dialog.showModal();
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
})();
