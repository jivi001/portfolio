// ==================== Premium Portfolio JavaScript ====================

// Configuration
const CONFIG = {
    API_BASE_URL: 'http://localhost:5000/api',
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
    if (window.innerWidth < 768) return; // Skip on mobile
    
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

// ==================== Scroll Effects ====================

function setupScrollEffects() {
    const nav = document.getElementById('mainNav');
    
    window.addEventListener('scroll', () => {
        // Navigation background on scroll
        if (window.scrollY > CONFIG.SCROLL_OFFSET) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
}

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

// ==================== Navigation ====================

function setupNavigation() {
    // Smooth scroll for anchor links
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

// ==================== Scroll Reveal Animations ====================

function setupAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal class
    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
    
    // Observe cards for staggered animation
    document.querySelectorAll('.project-card, .premium-card, .stat-card, .about-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// ==================== Contact Form ====================

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            title: formData.get('title'),
            message: formData.get('message')
        };
        
        // Validate
        if (!validateForm(data)) {
            showNotification('Please fill all fields correctly', 'error');
            return;
        }
        
        // Get submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.classList.add('loading');
        
        try {
            const response = await fetch(`${CONFIG.API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok) {
                showNotification('✓ Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                
                // Show success in form status
                if (formStatus) {
                    formStatus.textContent = '✓ Thank you for reaching out! Check your email for confirmation.';
                    formStatus.className = 'mt-6 text-center text-cyan-400 font-semibold';
                    formStatus.classList.remove('hidden');
                }
            } else {
                throw new Error(result.error || 'Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('✗ ' + error.message, 'error');
            
            if (formStatus) {
                formStatus.textContent = '✗ Failed to send message. Please try again or email directly.';
                formStatus.className = 'mt-6 text-center text-red-400 font-semibold';
                formStatus.classList.remove('hidden');
            }
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('loading');
            
            // Hide status after 5 seconds
            if (formStatus) {
                setTimeout(() => {
                    formStatus.classList.add('hidden');
                }, 5000);
            }
        }
    });
}

function validateForm(data) {
    // Check all fields are filled
    if (!data.name || !data.email || !data.title || !data.message) {
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Validate message length
    if (data.message.length < 10) {
        return false;
    }
    
    return true;
}

// ==================== Notification System ====================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification fixed top-24 right-6 px-6 py-4 rounded-xl text-white font-semibold 
        shadow-2xl z-50 transform transition-all duration-300 flex items-center gap-3
        ${type === 'success' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 
          type === 'error' ? 'bg-gradient-to-r from-red-500 to-pink-500' : 
          'bg-gradient-to-r from-blue-500 to-purple-500'}`;
    
    // Add icon
    const icon = document.createElement('span');
    icon.textContent = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    icon.className = 'text-2xl';
    
    const text = document.createElement('span');
    text.textContent = message;
    
    notification.appendChild(icon);
    notification.appendChild(text);
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ==================== Mobile Menu ====================

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.querySelector('nav ul');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Animate menu icon
        const icon = mobileMenuBtn.querySelector('svg');
        if (icon) {
            icon.style.transform = mobileMenu.classList.contains('hidden') ? 
                'rotate(0deg)' : 'rotate(90deg)';
        }
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// ==================== Parallax Effect ====================

function setupParallaxEffect() {
    const orbs = document.querySelectorAll('.orb');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            const yPos = -(scrollY * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ==================== Magnetic Button Effect ====================

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

// ==================== Stats Counter Animation ====================

function animateStatsCounter() {
    const stats = document.querySelectorAll('.stat-card .text-3xl, .about-card .text-4xl');
    
    stats.forEach(stat => {
        const target = stat.textContent;
        
        // Skip if not a number
        if (isNaN(target) && target !== '∞') return;
        
        let current = 0;
        const increment = target === '∞' ? 0 : parseInt(target) / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.ceil(current) + (target.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// Initialize stats counter
animateStatsCounter();

// ==================== Lazy Load Images ====================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy, img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Utility Functions ====================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== Performance Monitoring ====================

if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
    });
}

// ==================== Console Branding ====================

console.log('%c🚀 Premium Portfolio', 'font-size: 20px; font-weight: bold; color: #06b6d4;');
console.log('%cBuilt with ❤️ by Jivi', 'font-size: 14px; color: #64748b;');
console.log('%cAI Engineer & Data Scientist', 'font-size: 12px; color: #3b82f6; font-style: italic;');