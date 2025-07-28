// script.js

// Smooth Scrolling for Anchor Links
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("navbar").classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Sticky Nav Shadow on Scroll
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
  } else {
    nav.style.boxShadow = "none";
  }
});

// Project Filter Buttons
const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(btn => {
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
}

function closeModal() {
  document.getElementById("project-modal").style.display = "none";
}

// Vanilla Tilt (3D Effect)
VanillaTilt.init(document.querySelectorAll(".project"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});

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
