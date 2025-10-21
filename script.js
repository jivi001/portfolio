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
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            submitButton.classList.add('loading');

            // Prepare form data
            const formData = {
                name: this.form.querySelector('#name').value.trim(),
                email: this.form.querySelector('#email').value.trim(),
                message: this.form.querySelector('#message').value.trim()
            };

            // Try Vercel API first, fallback to local if needed
            let apiUrl = 'https://jivitesh-portfolio.vercel.app/api/contact';
            
            // Check if we're on localhost for development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                apiUrl = '/api/contact'; // Fallback to local if available
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            let result;
            try {
                result = await response.json();
            } catch (e) {
                console.error('Failed to parse response:', e);
                throw new Error('Invalid response from server');
            }

            if (response.ok && result.success) {
                this.showSuccess();
            } else {
                // Handle validation errors
                if (result.errors && result.errors.length > 0) {
                    this.showValidationErrors(result.errors);
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(this.form, 'Failed to send message. Please try again.');
        } finally {
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    }

    showSuccess() {
        this.form.innerHTML = '<div class="success-message">Thank you! Your message has been sent successfully.</div>';
    }

    showValidationErrors(errors) {
        // Clear previous errors
        this.clearErrors();
        
        // Show each validation error
        errors.forEach(error => {
            if (error.includes('Name')) {
                this.showError(this.form.querySelector('#name'), error);
            } else if (error.includes('Email')) {
                this.showError(this.form.querySelector('#email'), error);
            } else if (error.includes('Message')) {
                this.showError(this.form.querySelector('#message'), error);
            } else {
                this.showError(this.form, error);
            }
        });
    }

    clearErrors() {
        // Remove all existing error messages
        this.form.querySelectorAll('.error-message').forEach(error => {
            error.remove();
        });
        
        // Remove error styling from inputs
        this.form.querySelectorAll('input, textarea').forEach(input => {
            input.style.borderColor = '';
        });
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
        this.theme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.toggleButton = document.querySelector('.theme-switch');
    }

    init() {
        this.applyTheme();
        this.addEventListeners();
        this.addTransitionEndListener();
    }

    addEventListeners() {
        this.toggleButton.addEventListener('click', () => {
            this.theme = this.theme === 'dark' ? 'light' : 'dark';
            this.applyTheme();
            this.animateToggle();
        });

        // System theme change detection
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    this.theme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        this.toggleButton.setAttribute('aria-label', 
            `Switch to ${this.theme === 'dark' ? 'light' : 'dark'} mode`);
    }

    animateToggle() {
        this.toggleButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.toggleButton.style.transform = 'scale(1)';
        }, 200);
    }

    addTransitionEndListener() {
        document.documentElement.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'background-color') {
                document.body.style.transition = 'none';
                requestAnimationFrame(() => {
                    document.body.style.transition = '';
                });
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize squares animation
    const squaresContainer = document.querySelector('.squares-background');
    if (squaresContainer) {
        const squares = new SquaresAnimation();
        squares.init(squaresContainer);
    }

    // Initialize typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        new TypingEffect(typingElement, TYPING_CONFIG).start();
    }

    // Initialize scroll reveal
    new ScrollReveal('.reveal').init();

    // Initialize form handler
    new FormHandler('contact-form').setupListeners();

    // Initialize smooth scroll
    new SmoothScroll();
});

