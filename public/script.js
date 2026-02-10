// ========================================
// Typing Animation
// ========================================
const phrases = [
  'scalable web apps.',
  'mobile experiences.',
  'media pipelines.',
  'clean architecture.',
  'performant APIs.',
  'intuitive interfaces.',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 40 : 70;

  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(type, delay);
}

type();

// ========================================
// Navigation
// ========================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  nav.classList.toggle('scrolled', scrollY > 50);
  lastScroll = scrollY;
});

// Mobile toggle
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const parent = entry.target.parentElement;
        const siblings = parent.querySelectorAll('.fade-up');
        let staggerIndex = 0;
        siblings.forEach((sib, i) => {
          if (sib === entry.target) staggerIndex = i;
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, staggerIndex * 100);

        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => fadeObserver.observe(el));

// ========================================
// Skill Bar Animations
// ========================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

skillFills.forEach(el => skillObserver.observe(el));

// ========================================
// Active Nav Link Highlighting
// ========================================
const sections = document.querySelectorAll('.section, .hero');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.querySelectorAll('a').forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  { threshold: 0.3 }
);

sections.forEach(section => sectionObserver.observe(section));

// ========================================
// Smooth scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
