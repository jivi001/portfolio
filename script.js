// ==================== Premium Portfolio JavaScript ====================

// Configuration - ENVIRONMENT AWARE
const CONFIG = {
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api' 
        : '/api', // Use relative URL for production
    ANIMATION_DURATION: 800,
    SCROLL_OFFSET: 100
};

// ==================== DOM Content Loaded ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('🚀 Initializing Premium Portfolio...');
    
    // Initialize all features
    setupPremiumCursor();
    setupScrollEffects();
    setupNavigation();
    setupAnimations();
    setupContactForm();
    setupMobileMenu();
    setupParallaxEffect();
    setupMagneticButtons();
    setupPageTransition();
    
    console.log('✨ Portfolio Initialized Successfully!');
}

// ==================== Premium Custom Cursor ====================
function setupPremiumCursor() {
    if (window.innerWidth < 768 || 'ontouchstart' in window) return; // Skip on mobile/touch devices
    
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (!cursorDot || !cursorRing) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;

    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Dot follows immediately
        dotX += (mouseX - dotX) * 1;
        dotY += (mouseY - dotY) * 1;
        
        // Ring follows with delay
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        cursorRing.style.left = (ringX - 20) + 'px';
        cursorRing.style.top = (ringY - 20) + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();

    // Interactive elements hover
    const interactiveElements = document.querySelectorAll('a, button, .premium-card, .project-card, input, textarea');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.6)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.3)';
        });
    });
}

// ==================== Contact Form Handler ====================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            title: formData.get('title'),
            message: formData.get('message')
        };

        // Validate form data
        const errors = validateContactForm(data);
        if (errors.length > 0) {
            showFormStatus(errors.join(', '), 'error');
            return;
        }

        // Show loading state
        submitText.classList.add('hidden');
        submitLoader.classList.remove('hidden');
        submitBtn.disabled = true;

        try {
            console.log('Sending to:', CONFIG.API_BASE_URL + '/contact');
            
            const response = await fetch(CONFIG.API_BASE_URL + '/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                showFormStatus('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showFormStatus('✗ Failed to send message. Please try again or email directly.', 'error');
        } finally {
            // Reset button state
            submitText.classList.remove('hidden');
            submitLoader.classList.add('hidden');
            submitBtn.disabled = false;
        }
    });

    function validateContactForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters');
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push('Invalid email address');
        }
        
        if (!data.title || data.title.trim().length < 5) {
            errors.push('Project title must be at least 5 characters');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters');
        }
        
        return errors;
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `mt-6 text-center font-semibold ${type === 'success' ? 'text-cyan-400' : 'text-red-400'}`;
        formStatus.classList.remove('hidden');
        
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 5000);
    }
}

// ==================== All other functions from your script.js ====================
// ... (include all other functions from attached_file:1)

// ==================== Scroll Effects ====================
function setupScrollEffects() {
    const nav = document.getElementById('mainNav');
    
    const scrollHandler = debounce(() => {
        if (window.scrollY > CONFIG.SCROLL_OFFSET) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }, 16);

    window.addEventListener('scroll', scrollHandler);
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-cyan-400');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-cyan-400');
                    }
                });
            }
        });
    }
}

// ==================== Navigation ====================
function setupNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== Animations ====================
function setupAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-card')) {
                    const skillFill = entry.target.querySelector('.skill-fill');
                    if (skillFill) {
                        const width = skillFill.dataset.width;
                        setTimeout(() => {
                            skillFill.style.width = width;
                        }, 200);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

// ==================== Mobile Menu ====================
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('translate-x-full');
    });

    // Close menu when clicking a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.add('translate-x-full');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.add('translate-x-full');
        }
    });
}

// ==================== Magnetic Buttons ====================
function setupMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== Page Transition ====================
function setupPageTransition() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;

    // Hide transition on load
    window.addEventListener('load', () => {
        setTimeout(() => {
            transition.classList.remove('active');
        }, 300);
    });

    // Show transition on page navigation
    document.querySelectorAll('a[href$=".html"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.target === '_blank') return;
            
            e.preventDefault();
            transition.classList.add('active');
            
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });
}

// ==================== Utility Functions ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== Console Branding ====================
console.log('%c🚀 Premium Portfolio', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
console.log('%cBuilt with ❤️ by Jivi', 'font-size: 14px; color: #64748b;');
console.log('%cAI Engineer & Data Scientist', 'font-size: 12px; color: #3b82f6; font-style: italic;');
// ==================== End of script.js ====================