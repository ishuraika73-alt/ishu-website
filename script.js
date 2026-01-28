// Small script to add slide-in animations, navigation between sections and next/prev controls

document.addEventListener('DOMContentLoaded', function () {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // IntersectionObserver to reveal panels
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.from-left, .from-right').forEach(n => n.classList.add('in-view'));
      }
    });
  }, { threshold: 0.18 });

  document.querySelectorAll('.panel').forEach(p => io.observe(p));

  // nav buttons
  document.querySelectorAll('.nav-btn, .cta .primary').forEach(btn => {
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

  document.getElementById('next').addEventListener('click', () => {
    const current = findCurrentSectionIndex();
    scrollToSection(Math.min(sections.length - 1, current + 1));
  });
  document.getElementById('prev').addEventListener('click', () => {
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
      document.getElementById('next').click();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      document.getElementById('prev').click();
    }
  });

  // small accessibility: focus styles for buttons
  document.querySelectorAll('button, a').forEach(el => {
    el.addEventListener('focus', () => el.style.outline = '2px solid rgba(25,193,217,0.25)');
    el.addEventListener('blur', () => el.style.outline = 'none');
  });
});