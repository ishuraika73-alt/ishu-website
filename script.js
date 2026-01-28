// Slide-in animations, navigation and next/prev controls

document.addEventListener('DOMContentLoaded', function () {
  // set year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // IntersectionObserver to reveal panels
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.from-left, .from-right').forEach(n => n.classList.add('in-view'));
      }
    });
  }, { threshold: 0.16 });

  document.querySelectorAll('.panel').forEach(p => io.observe(p));

  // nav buttons
  document.querySelectorAll('.nav-btn, .cta-row .primary, .cta-row .ghost').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const target = ev.currentTarget.dataset.target;
      if (target) {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // next / prev section logic
  const sections = Array.from(document.querySelectorAll('.panel'));
  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');
  if (nextBtn) nextBtn.addEventListener('click', () => {
    const current = findCurrentSectionIndex();
    scrollToSection(Math.min(sections.length - 1, current + 1));
  });
  if (prevBtn) prevBtn.addEventListener('click', () => {
    const current = findCurrentSectionIndex();
    scrollToSection(Math.max(0, current - 1));
  });

  function findCurrentSectionIndex() {
    const top = window.scrollY + window.innerHeight * 0.15;
    let idx = 0;
    sections.forEach((s, i) => {
      if (s.offsetTop <= top) idx = i;
    });
    return idx;
  }

  // keyboard nav
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (nextBtn) nextBtn.click();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (prevBtn) prevBtn.click();
    }
  });

  // focus styles for accessibility
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('focus', () => el.style.outline = '2px solid rgba(25,193,217,0.25)');
    el.addEventListener('blur', () => el.style.outline = 'none');
  });
});