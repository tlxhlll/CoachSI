// CoachSI project page: clip viewers, on-screen autoplay, and the BibTeX copy button.

// Clip viewers: a tab swaps the clip and plays it. Clips live next to the viewer's first video.
document.querySelectorAll('[data-viewer]').forEach((viewer) => {
  const video = viewer.querySelector('video');
  const tabs = [...viewer.querySelectorAll('[role="tab"]')];
  const dir = video.getAttribute('src').replace(/[^/]*$/, '');
  const select = (tab) => {
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    video.poster = `${dir}${tab.dataset.clip}.jpg`;
    video.src = `${dir}${tab.dataset.clip}.mp4`;
    video.play().catch(() => {});
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      select(next);
    });
  });
});

// Videos marked data-autoplay play while they are on screen and pause when they leave it.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.play().catch(() => {});
      else e.target.pause();
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('video[data-autoplay]').forEach((v) => io.observe(v));
}

// Clips without native controls: click, Space or Enter pauses and resumes.
document.querySelectorAll('video[data-toggle]').forEach((v) => {
  const toggle = () => { if (v.paused) v.play().catch(() => {}); else v.pause(); };
  v.addEventListener('click', toggle);
  v.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
  });
});

// BibTeX copy button.
document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = document.querySelector(button.dataset.copy).textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select and copy';
    }
    setTimeout(() => { button.textContent = 'Copy'; }, 1600);
  });
});
