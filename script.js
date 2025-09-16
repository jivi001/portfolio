// Constants
const TYPING_CONFIG = {
    texts: ["AI & Data Science Engineer", "Full-Stack Developer", "Tech Enthusiast 🚀"],
    typeSpeed: 100,
    eraseSpeed: 50,
    delayBeforeErase: 2000,
    delayBeforeType: 200,
    initialDelay: 500
};

const PARTICLES_CONFIG = {
    "particles": {
        "number": {
            "value": 60,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#38bdf8"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.5,
            "random": true
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#facc15",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "out_mode": "out"
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            }
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.7
                }
            },
            "push": {
                "particles_nb": 4
            }
        }
    },
    "retina_detect": true
};

// Typing Effect Class
class TypingEffect {
    constructor(element, config) {
        this.element = element;
        this.config = config;
        this.arrayIndex = 0;
        this.charIndex = 0;
    }

    type() {
        if (!this.element) return;

        if (this.charIndex < this.config.texts[this.arrayIndex].length) {
            this.element.textContent += this.config.texts[this.arrayIndex].charAt(this.charIndex);
            this.charIndex++;
            setTimeout(() => this.type(), this.config.typeSpeed);
        } else {
            setTimeout(() => this.erase(), this.config.delayBeforeErase);
        }
    }

    erase() {
        if (!this.element) return;

        if (this.charIndex > 0) {
            this.element.textContent = this.config.texts[this.arrayIndex].substring(0, this.charIndex - 1);
            this.charIndex--;
            setTimeout(() => this.erase(), this.config.eraseSpeed);
        } else {
            this.arrayIndex = (this.arrayIndex + 1) % this.config.texts.length;
            setTimeout(() => this.type(), this.config.delayBeforeType);
        }
    }

    start() {
        if (this.config.texts.length) {
            setTimeout(() => this.type(), this.config.initialDelay);
        }
    }
}

// Scroll Reveal Class
class ScrollReveal {
    constructor(selector, threshold = 100) {
        this.elements = document.querySelectorAll(selector);
        this.threshold = threshold;
        this.windowHeight = window.innerHeight;
    }

    reveal() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < this.windowHeight - this.threshold) {
                element.classList.add("active");
            }
        });
    }

    init() {
        window.addEventListener("scroll", () => this.reveal(), { passive: true });
        // Initial check
        this.reveal();
    }
}

// Add form validation and submission handling
class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.setupListeners();
    }

    setupListeners() {
        if (!this.form) return;
        
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (this.validateForm()) {
                await this.handleSubmit();
            }
        });
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
                this.showError(input, 'Please enter a valid email');
                isValid = false;
            }
        });
        
        return isValid;
    }

    showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || 
                     this.createErrorElement(message);
        formGroup.appendChild(error);
    }

    createErrorElement(message) {
        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        return error;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async handleSubmit() {
        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                this.showSuccess();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(this.form, 'Failed to send message. Please try again.');
        }
    }

    showSuccess() {
        this.form.innerHTML = '<div class="success-message">Thank you! Your message has been sent.</div>';
    }
}

// Add smooth scroll behavior
class SmoothScroll {
    constructor() {
        this.setupListeners();
    }

    setupListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Theme Switcher Class
class ThemeSwitcher {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'dark';
    this.toggleButton = document.querySelector('.theme-switch');
    this.toggleIcon = this.toggleButton.querySelector('i');
  }

  init() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateIcon();

    // Add click event listener
    this.toggleButton.addEventListener('click', () => this.toggleTheme());

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    localStorage.setItem('theme', this.theme);
  }

  updateIcon() {
    this.toggleIcon.className = this.theme === 'dark' 
      ? 'fas fa-moon' 
      : 'fas fa-sun';
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateIcon();
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    try {
        // Initialize typing effect
        const typingElement = document.querySelector(".typing-text");
        if (typingElement) {
            const typing = new TypingEffect(typingElement, TYPING_CONFIG);
            typing.start();
        }

        // Initialize scroll reveal
        const scrollReveal = new ScrollReveal(".reveal");
        scrollReveal.init();

        // Initialize particles
        if (typeof particlesJS !== 'undefined') {
            particlesJS("particles-js", PARTICLES_CONFIG);
        } else {
            console.warn("Particles.js is not loaded");
        }

        // Initialize new features
        new FormHandler('contact-form');
        new SmoothScroll();
        new ThemeSwitcher().init();

        // Add mobile menu functionality
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });
        }

    } catch (error) {
        console.error("Error initializing portfolio scripts:", error);
    }
});
