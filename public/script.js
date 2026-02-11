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
// Hero Glow Mouse Tracking
// ========================================
const hero = document.getElementById('hero');
const glow1 = document.querySelector('.hero-glow-1');
const glow2 = document.querySelector('.hero-glow-2');
const glow3 = document.querySelector('.hero-glow-3');

let mouseX = 0;
let mouseY = 0;
let currentX1 = 0, currentY1 = 0;
let currentX2 = 0, currentY2 = 0;
let currentX3 = 0, currentY3 = 0;

hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();
  mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
  mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
});

hero.addEventListener('mouseleave', () => {
  mouseX = 0;
  mouseY = 0;
});

function animateGlows() {
  const ease = 0.04;

  const targetX1 = mouseX * 120;
  const targetY1 = mouseY * 80;
  currentX1 += (targetX1 - currentX1) * ease;
  currentY1 += (targetY1 - currentY1) * ease;
  glow1.style.transform = `translate(${currentX1}px, ${currentY1}px)`;

  const targetX2 = mouseX * -100;
  const targetY2 = mouseY * -60;
  currentX2 += (targetX2 - currentX2) * ease;
  currentY2 += (targetY2 - currentY2) * ease;
  glow2.style.transform = `translate(${currentX2}px, ${currentY2}px)`;

  const targetX3 = mouseX * 70 - 50;
  const targetY3 = mouseY * 90 - 50;
  currentX3 += (targetX3 - currentX3) * (ease * 0.7);
  currentY3 += (targetY3 - currentY3) * (ease * 0.7);
  glow3.style.transform = `translate(calc(-50% + ${currentX3}px), calc(-50% + ${currentY3}px))`;

  requestAnimationFrame(animateGlows);
}

animateGlows();

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
