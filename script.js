// ---------- Loader ----------
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hide'), 700);
});

// ---------- Custom cursor (desktop only) ----------
const cursorDot = document.getElementById('cursorDot');
const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (hasFinePointer) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .glass').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorDot.style.width = '22px'; cursorDot.style.height = '22px'; });
    el.addEventListener('mouseleave', () => { cursorDot.style.width = '10px'; cursorDot.style.height = '10px'; });
  });
}

// ---------- Scroll progress + back-to-top ----------
const progressFill = document.getElementById('scrollProgressFill');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = pct + '%';
  backToTop.classList.toggle('show', scrollTop > 500);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', false);
}));

// ---------- Scrollspy ----------
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('[data-nav]');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`[data-nav][href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spyObserver.observe(s));

// ---------- Reveal on scroll ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---------- Hero role rotator ----------
const roleWords = document.querySelectorAll('.role-word');
let roleIndex = 0;
setInterval(() => {
  roleWords[roleIndex].classList.remove('active');
  roleIndex = (roleIndex + 1) % roleWords.length;
  roleWords[roleIndex].classList.add('active');
}, 2600);

// ---------- Resume button (placeholder until a resume file is linked) ----------
document.getElementById('resumeBtn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Add your resume file link here to enable this download button.');
});