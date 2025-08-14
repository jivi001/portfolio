// Theme Switch
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.body.classList[currentTheme === 'dark' ? 'add' : 'remove']('dark-theme');
    toggleSwitch.checked = currentTheme === 'dark';
}

function switchTheme(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme);

// Sticky Nav Shadow on Scroll
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  nav.style.boxShadow = window.scrollY > 50 ? "0 2px 8px rgba(0, 0, 0, 0.15)" : "none";
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Project Filter Buttons
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project").forEach(card => {
      card.style.display = (filter === "all" || card.dataset.category.includes(filter)) ? "block" : "none";
    });
  });
});

// Modal Viewer
function openModal(title, tech) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-tech").textContent = tech;
  document.getElementById("project-modal").style.display = "flex";
  // Allow closing modal with Escape key
  document.addEventListener("keydown", escCloseModal);
}
function closeModal() {
  document.getElementById("project-modal").style.display = "none";
  document.removeEventListener("keydown", escCloseModal);
}
function escCloseModal(e) {
  if (e.key === "Escape") closeModal();
}
// Close modal when clicking outside content
document.getElementById("project-modal").addEventListener("click", function(e) {
  if (e.target === this) closeModal();
});
window.openModal = openModal;
window.closeModal = closeModal;

// Vanilla Tilt (3D Effect)
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll(".project"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
  });
}

// Animate Skill Wheel on Scroll
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.to("#skillWheel", {
    scrollTrigger: {
      trigger: "#skills",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power2.out"
  });
}

// Remove duplicate typed strings and consolidate them here
const typedStrings = [
    "Aspiring Student",
    "Innovator",
    "Visionary",
    "Lifelong Learner",
    "Problem Solver",
    "Tech Visionary",
    "Startup Mindset"
];

// Initialize Typed.js
new Typed('#typed-title', {
    strings: typedStrings,
    typeSpeed: 80,
    backSpeed: 50,
    loop: true
});

// Initialize VANTA.NET
VANTA.NET({
    el: "#vanta-hero",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 400.00,
    minWidth: 400.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x38b000,
    backgroundColor: 0x003049,
    points: 12.0,
    maxDistance: 20.0,
    spacing: 15.0
});

// GSAP Animations
gsap.from(".hero-title", { duration: 1.2, y: -50, opacity: 0, ease: "power2.out" });
gsap.from(".btn", { duration: 1, delay: 0.5, y: 20, opacity: 0 });
