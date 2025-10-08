const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
const sections = document.querySelectorAll('.section');
const cursorOrb = document.querySelector('.cursor-orb');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('is-open');
  });

  document.addEventListener('click', (event) => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      const mediaCards = entry.target.querySelectorAll('.about__media-card');
      mediaCards.forEach((card, index) => {
        requestAnimationFrame(() => {
          card.style.transform = 'translateY(0)';
          card.style.opacity = '1';
          card.style.transitionDelay = `${index * 0.15}s`;
        });
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

sections.forEach((section) => observer.observe(section));

window.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  cursorOrb.style.transform = `translate(calc(${clientX}px - 50%), calc(${clientY}px - 50%))`;
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const opacity = Math.max(0.15, Math.min(0.55, scrollY / 1000));
  cursorOrb.style.opacity = opacity;
});
