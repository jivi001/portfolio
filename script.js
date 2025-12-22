// ==================== Premium Portfolio JavaScript v2.0 ====================

// Performance & Configuration System
const CONFIG = {
    // API URL: Use Worker in production, localhost for development
    API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8787' // Wrangler dev server
        : 'https://portfolio-api.jiviteshgd28.workers.dev', // Production Worker URL
    ANIMATION_DURATION: 800,
    SCROLL_OFFSET: 100,
    PERFORMANCE_MODE: window.navigator.hardwareConcurrency < 4,
    REDUCED_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    TOUCH_DEVICE: 'ontouchstart' in window || navigator.maxTouchPoints > 0
};

// Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.startTime = performance.now();
        this.metrics = new Map();
    }

    mark(name) {
        performance.mark(name);
        console.log(`📊 Performance Mark: ${name} at ${Math.round(performance.now())}ms`);
    }

    measure(name, startMark, endMark) {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        this.metrics.set(name, Math.round(measure.duration));
        console.log(`⚡ ${name}: ${Math.round(measure.duration)}ms`);
        return measure.duration;
    }

    getLoadTime() {
        return Math.round(performance.now() - this.startTime);
    }
}

// Initialize Performance Monitor
const perf = new PerformanceMonitor();
perf.mark('script-start');

// ==================== DOM Content Loaded ====================
document.addEventListener('DOMContentLoaded', () => {
    perf.mark('dom-ready');
    initializeApp();
});

function initializeApp() {
    perf.mark('app-init-start');
    console.log('🚀 Initializing Premium Portfolio v2.0...');

    try {
        // Core Features (Always Load)
        setupScrollEffects();
        setupNavigation();
        setupAnimations();
        setupContactForm();
        setupMobileMenu();
        setupAccessibility();
        setupStatsCounters();

        // Progressive Enhancement
        if (!CONFIG.PERFORMANCE_MODE && !CONFIG.REDUCED_MOTION) {
            setupPremiumCursor();
            setupMagneticButtons();
            setupParallaxEffect();
            setupPageTransition();
        }

        // Initialize Analytics
        setupAnalytics();

        perf.mark('app-init-end');
        perf.measure('app-initialization', 'app-init-start', 'app-init-end');

        console.log('✨ Portfolio Initialized Successfully!');
        console.log(`⚡ Total load time: ${perf.getLoadTime()}ms`);

    } catch (error) {
        console.error('❌ Initialization error:', error);
        // Graceful fallback
        setupBasicFunctionality();
    }
}

// ==================== Premium Custom Cursor ====================
function setupPremiumCursor() {
    if (CONFIG.TOUCH_DEVICE || window.innerWidth < 768) return;

    perf.mark('cursor-setup-start');

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (!cursorDot || !cursorRing) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;

    // Optimized mouse tracking
    const handleMouseMove = throttle((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, 16);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Smooth cursor animation with RAF
    function animateCursor() {
        const speed = isHovering ? 0.25 : 0.15;

        dotX += (mouseX - dotX) * 1;
        dotY += (mouseY - dotY) * 1;
        ringX += (mouseX - ringX) * speed;
        ringY += (mouseY - ringY) * speed;

        cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        cursorRing.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0)`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Enhanced interactive elements
    const interactiveSelector = 'a, button, .premium-card, .project-card, .skill-card, input, textarea, select, [role="button"], [tabindex="0"]';
    const interactiveElements = document.querySelectorAll(interactiveSelector);

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            isHovering = true;
            cursorDot.style.transform += ' scale(2)';
            cursorRing.style.width = '60px';
            cursorRing.style.height = '60px';
            cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.8)';
        }, { passive: true });

        el.addEventListener('mouseleave', () => {
            isHovering = false;
            cursorDot.style.transform = cursorDot.style.transform.replace(' scale(2)', '');
            cursorRing.style.width = '40px';
            cursorRing.style.height = '40px';
            cursorRing.style.borderColor = 'rgba(6, 182, 212, 0.3)';
        }, { passive: true });
    });

    perf.mark('cursor-setup-end');
    perf.measure('cursor-setup', 'cursor-setup-start', 'cursor-setup-end');
}

// ==================== Enhanced Contact Form Handler ====================
function setupContactForm() {
    perf.mark('contact-form-start');

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');

    if (!contactForm) return;

    // Form validation setup
    const formFields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        company: document.getElementById('company'),
        projectType: document.getElementById('project-type'),
        title: document.getElementById('title'),
        message: document.getElementById('message')
    };

    // Real-time validation
    Object.entries(formFields).forEach(([key, field]) => {
        if (!field) return;

        field.addEventListener('blur', () => validateField(key, field));
        field.addEventListener('input', debounce(() => {
            if (field.value.length > 0) {
                clearFieldError(field);
            }
        }, 300));
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        perf.mark('form-submit-start');

        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(),
            company: formData.get('company')?.trim(),
            project_type: formData.get('project_type'),
            title: formData.get('title')?.trim(),
            message: formData.get('message')?.trim(),
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent.substring(0, 200) // Truncated for privacy
        };



        // Enhanced validation
        const errors = validateContactForm(data);
        if (errors.length > 0) {
            showFormStatus(errors[0], 'error');
            focusFirstErrorField();
            return;
        }

        // Show enhanced loading state
        setSubmitButtonState('loading');

        try {
            console.log('📤 Sending contact form to:', CONFIG.API_BASE_URL + '/api/contact');



            const response = await fetch(CONFIG.API_BASE_URL + '/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok) {


                showFormStatus('✅ Message sent successfully! I\'ll respond within 24 hours.', 'success');
                contactForm.reset();
                trackAnalytics('contact_form_success', { project_type: data.project_type });

                // Show thank you message
                setTimeout(() => {
                    showThankYouMessage(data.name);
                }, 1000);

            } else {
                throw new Error(responseData.error || `Server error: ${response.status}`);
            }
        } catch (error) {
            console.error('📧 Contact form error:', error);



            let errorMessage = '❌ Message failed to send. ';

            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage += 'Please check your internet connection or try again later.';
            } else if (error.message.includes('500')) {
                errorMessage += 'Server error - please email me directly at jivitesh28@gmail.com';
            } else {
                errorMessage += 'Please try again or email me directly.';
            }

            showFormStatus(errorMessage, 'error');
            trackAnalytics('contact_form_error', { error: error.message });
        } finally {
            setSubmitButtonState('ready');
            perf.mark('form-submit-end');
            perf.measure('form-submission', 'form-submit-start', 'form-submit-end');
        }
    });

    function validateContactForm(data) {
        const errors = [];

        if (!data.name || data.name.length < 2) {
            setFieldError(formFields.name, 'Name must be at least 2 characters');
            errors.push('Name is required');
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!data.email || !emailRegex.test(data.email)) {
            setFieldError(formFields.email, 'Please enter a valid email address');
            errors.push('Valid email is required');
        }

        if (!data.title || data.title.length < 5) {
            setFieldError(formFields.title, 'Project title must be at least 5 characters');
            errors.push('Project title is required');
        }

        if (!data.message || data.message.length < 20) {
            setFieldError(formFields.message, 'Please provide more details (at least 20 characters)');
            errors.push('Message too short');
        }

        return errors;
    }

    function validateField(fieldName, field) {
        const value = field.value.trim();
        clearFieldError(field);

        switch (fieldName) {
            case 'name':
                if (value.length > 0 && value.length < 2) {
                    setFieldError(field, 'Name must be at least 2 characters');
                    return false;
                }
                break;
            case 'email':
                if (value.length > 0 && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                    setFieldError(field, 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'title':
                if (value.length > 0 && value.length < 5) {
                    setFieldError(field, 'Project title must be at least 5 characters');
                    return false;
                }
                break;
            case 'message':
                if (value.length > 0 && value.length < 20) {
                    setFieldError(field, 'Please provide more details');
                    return false;
                }
                break;
        }
        return true;
    }

    function setFieldError(field, message) {
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
        field.classList.add('form-error');
        field.setAttribute('aria-invalid', 'true');
    }

    function clearFieldError(field) {
        const errorElement = document.getElementById(field.id + '-error');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
        field.classList.remove('form-error');
        field.removeAttribute('aria-invalid');
    }

    function setSubmitButtonState(state) {
        switch (state) {
            case 'loading':
                submitText.classList.add('hidden');
                submitLoader.classList.remove('hidden');
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                break;
            case 'ready':
                submitText.classList.remove('hidden');
                submitLoader.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                break;
        }
    }

    function showFormStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `mt-6 text-center font-semibold rounded-lg p-4 ${type === 'success'
            ? 'status-success'
            : 'status-error'
            }`;
        formStatus.classList.remove('hidden');

        // Auto-hide after 8 seconds for success, 12 for errors
        const hideDelay = type === 'success' ? 8000 : 12000;
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, hideDelay);
    }

    function showThankYouMessage(name) {
        const firstName = name.split(' ')[0];
        showFormStatus(`🎉 Thanks ${firstName}! Your message is important to me. Expect a thoughtful response within 24 hours.`, 'success');
    }

    function focusFirstErrorField() {
        const firstErrorField = contactForm.querySelector('.form-error');
        if (firstErrorField) {
            firstErrorField.focus();
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    perf.mark('contact-form-end');
    perf.measure('contact-form-setup', 'contact-form-start', 'contact-form-end');
}

// ==================== Enhanced Scroll Effects ====================
function setupScrollEffects() {
    const nav = document.getElementById('mainNav');
    const scrollIndicator = createScrollIndicator();

    const scrollHandler = throttle(() => {
        const scrollY = window.scrollY;

        // Navigation transparency effect
        if (scrollY > CONFIG.SCROLL_OFFSET) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }

        // Update active navigation link
        updateActiveNavLink();

        // Update scroll indicator
        updateScrollIndicator(scrollIndicator);

        // Parallax effect for orbs (if enabled)
        if (!CONFIG.REDUCED_MOTION) {
            updateParallaxElements(scrollY);
        }

    }, 16);

    window.addEventListener('scroll', scrollHandler, { passive: true });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.removeAttribute('aria-current');
                    link.classList.remove('text-cyan-400');

                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.setAttribute('aria-current', 'page');
                        link.classList.add('text-cyan-400');
                    }
                });
            }
        });
    }

    function createScrollIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-50 transition-all duration-300';
        indicator.style.width = '0%';
        document.body.appendChild(indicator);
        return indicator;
    }

    function updateScrollIndicator(indicator) {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        indicator.style.width = Math.min(scrollPercent, 100) + '%';
    }

    function updateParallaxElements(scrollY) {
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrollY * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ==================== Enhanced Navigation System ====================
function setupNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 100;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, targetId);

                // Track navigation
                trackAnalytics('navigation_click', { target: targetId });
            }
        });
    });

    // Handle browser back/forward navigation
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Handle initial hash on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }, 100); // Small delay to ensure layout is ready
    }
}

// ==================== Enhanced Animation System ====================
function setupAnimations() {
    perf.mark('animations-start');

    if (CONFIG.REDUCED_MOTION) {
        // Skip animations for users who prefer reduced motion
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('active');
        });
        return;
    }

    const observerOptions = {
        threshold: CONFIG.PERFORMANCE_MODE ? 0.2 : 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Special handling for different element types
                handleSpecialAnimations(entry.target);

                // Unobserve after activation for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });

    function handleSpecialAnimations(element) {
        // Skill bar animations
        if (element.classList.contains('skill-card')) {
            const skillFill = element.querySelector('.skill-fill');
            if (skillFill && skillFill.dataset.width) {
                setTimeout(() => {
                    skillFill.style.width = skillFill.dataset.width;
                }, 300);
            }
        }

        // Stats counter animations
        if (element.querySelector('[data-count]')) {
            animateStatsCounters(element);
        }

        // Track element activation
        trackAnalytics('element_revealed', {
            element: element.id || element.className.split(' ')[0]
        });
    }

    perf.mark('animations-end');
    perf.measure('animations-setup', 'animations-start', 'animations-end');
}

// ==================== Stats Counter Animation ====================
function setupStatsCounters() {
    // This will be called when stats section comes into view
    // Implementation moved to handleSpecialAnimations for better performance
}

function animateStatsCounters(container) {
    const counters = container.querySelectorAll('[data-count]');

    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current >= target) {
                counter.textContent = target === 700 ? '700%' : target === 50 ? '50+' : target;
                return;
            }

            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        };

        setTimeout(updateCounter, parseInt(counter.parentElement.style.transitionDelay || 0) * 1000);
    });
}

// ==================== Enhanced Mobile Menu ====================
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileMenuBtn || !mobileMenu) return;

    function openMobileMenu() {
        mobileMenu.classList.remove('hidden', 'translate-x-full');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';

        // Focus management
        const firstLink = mobileMenu.querySelector('a');
        if (firstLink) firstLink.focus();

        trackAnalytics('mobile_menu_opened');
    }

    function closeMobileMenuFunc() {
        mobileMenu.classList.add('hidden', 'translate-x-full');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        mobileMenuBtn.focus();
    }

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
        isOpen ? closeMobileMenuFunc() : openMobileMenu();
    });

    closeMobileMenu?.addEventListener('click', closeMobileMenuFunc);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.getAttribute('aria-hidden') === 'false') {
            closeMobileMenuFunc();
        }
    });

    // Close menu when clicking a link
    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', closeMobileMenuFunc);
    });

    // Close menu when clicking outside (touch devices)
    document.addEventListener('click', (e) => {
        const isClickInsideMenu = mobileMenu.contains(e.target) || mobileMenuBtn.contains(e.target);
        const isMenuOpen = mobileMenu.getAttribute('aria-hidden') === 'false';

        if (!isClickInsideMenu && isMenuOpen) {
            closeMobileMenuFunc();
        }
    });
}

// ==================== Enhanced Magnetic Buttons ====================
function setupMagneticButtons() {
    if (CONFIG.TOUCH_DEVICE) return;

    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(button => {
        let isHovering = false;

        button.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        button.addEventListener('mouseleave', () => {
            isHovering = false;
            button.style.transform = 'translate(0, 0)';
        });

        button.addEventListener('mousemove', throttle((e) => {
            if (!isHovering) return;

            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * 0.15;
            const deltaY = (e.clientY - centerY) * 0.15;

            button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }, 16), { passive: true });
    });
}

// ==================== Page Transition System ====================
function setupPageTransition() {
    const transition = document.getElementById('pageTransition');
    if (!transition) return;

    // Enhanced loading sequence
    const loadingSteps = [
        'Loading assets...',
        'Initializing components...',
        'Setting up interactions...',
        'Almost ready...',
        'Welcome!'
    ];

    let currentStep = 0;
    const loadingText = document.getElementById('loadingText');

    const updateLoadingText = () => {
        if (loadingText && currentStep < loadingSteps.length) {
            loadingText.textContent = loadingSteps[currentStep];
            currentStep++;
        }
    };

    // Update loading text every 150ms
    const loadingInterval = setInterval(updateLoadingText, 150);

    // Hide transition after load
    window.addEventListener('load', () => {
        clearInterval(loadingInterval);
        setTimeout(() => {
            transition.classList.remove('active');
            trackAnalytics('page_loaded', {
                loadTime: perf.getLoadTime(),
                page: window.location.pathname
            });
        }, 800);
    });

    // Page navigation transitions
    document.querySelectorAll('a[href$=".html"]:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            transition.classList.add('active');
            loadingText.textContent = 'Loading page...';

            setTimeout(() => {
                window.location.href = link.href;
            }, 400);
        });
    });
}

// ==================== Accessibility Enhancements ====================
function setupAccessibility() {
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Escape key handling
        if (e.key === 'Escape') {
            closeActiveModals();
            closeMobileMenu();
        }

        // Tab trap for modals
        if (e.key === 'Tab') {
            handleTabTrap(e);
        }
    });

    // Announce page changes to screen readers
    announcePageChanges();
}

// ==================== Analytics & Performance Tracking ====================
function setupAnalytics() {
    // Privacy-respecting analytics
    if (localStorage.getItem('analytics-opt-out') === 'true') {
        console.log('📊 Analytics disabled by user preference');
        return;
    }

    // Track page view
    trackAnalytics('page_view', {
        page: window.location.pathname,
        referrer: document.referrer ? new URL(document.referrer).hostname : 'direct',
        loadTime: perf.getLoadTime()
    });

    // Track user engagement
    let engagementTimer = 0;
    const trackEngagement = setInterval(() => {
        engagementTimer += 5;
        if (engagementTimer === 30) { // 30 seconds
            trackAnalytics('engagement_30s');
        }
        if (engagementTimer === 60) { // 1 minute
            trackAnalytics('engagement_1m');
            clearInterval(trackEngagement);
        }
    }, 5000);

    // Track interactions
    document.addEventListener('click', (e) => {
        const element = e.target.closest('[data-track]');
        if (element) {
            trackAnalytics('interaction', {
                element: element.dataset.track,
                text: element.textContent?.substring(0, 50)
            });
        }
    });
}

function trackAnalytics(event, properties = {}) {
    if (CONFIG.API_BASE_URL && 'navigator' in window && 'sendBeacon' in navigator) {
        const data = JSON.stringify({
            event,
            properties: {
                ...properties,
                timestamp: Date.now(),
                userAgent: navigator.userAgent.substring(0, 100),
                viewport: `${window.innerWidth}x${window.innerHeight}`,
                colorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            }
        });

        // Fixed: Changed from /analytics to /api/analytics
        navigator.sendBeacon(CONFIG.API_BASE_URL + '/api/analytics', data);
    }
}

// ==================== Parallax Effects ====================
function setupParallaxEffect() {
    if (CONFIG.REDUCED_MOTION || CONFIG.PERFORMANCE_MODE) return;

    const parallaxElements = document.querySelectorAll('.orb, .float-animation');

    const handleScroll = throttle(() => {
        const scrollY = window.scrollY;

        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrollY * speed);
            element.style.transform += ` translateY(${yPos}px)`;
        });
    }, 16);

    window.addEventListener('scroll', handleScroll, { passive: true });
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

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== Error Handling ====================
function setupBasicFunctionality() {
    console.log('🔧 Setting up basic functionality fallback...');

    // Basic form handling without advanced features
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted! Please contact directly at jivitesh28@gmail.com');
        });
    }

    // Basic navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ==================== Helper Functions ====================
function closeActiveModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
}

function announcePageChanges() {
    // Create ARIA live region for dynamic content updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);

    return liveRegion;
}

function handleTabTrap(e) {
    const modal = document.querySelector('.modal.active');
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
    }
}

// ==================== Performance Monitoring ====================
window.addEventListener('load', () => {
    perf.mark('page-fully-loaded');
    perf.measure('total-load-time', 'script-start', 'page-fully-loaded');

    // Log performance metrics
    const metrics = {
        totalLoadTime: perf.getLoadTime(),
        domReady: perf.metrics.get('dom-ready') || 0,
        appInit: perf.metrics.get('app-initialization') || 0
    };

    console.log('📊 Performance Metrics:', metrics);

    // Send performance data (if analytics enabled)
    trackAnalytics('performance_metrics', metrics);

    // Web Vitals monitoring (if available)
    if ('web-vitals' in window) {
        import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(console.log);
            getFID(console.log);
            getFCP(console.log);
            getLCP(console.log);
            getTTFB(console.log);
        });
    }
});

// ==================== Error Handling ====================
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', e.error);
    trackAnalytics('javascript_error', {
        message: e.message,
        filename: e.filename,
        line: e.lineno
    });
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 Unhandled Promise Rejection:', e.reason);
    trackAnalytics('promise_rejection', {
        reason: e.reason?.toString()
    });
});

// ==================== Professional Branding ====================
console.log('%c🚀 Jivitesh Portfolio v2.0', 'font-size: 20px; font-weight: bold; color: #06b6d4; text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3b82f6;');
console.log('%c🎯 AI Engineer & Data Scientist', 'font-size: 14px; color: #8b5cf6; font-weight: 600;');
console.log('%c💡 "Transforming Complex Data Into Intelligence"', 'font-size: 12px; color: #64748b; font-style: italic;');
console.log('%c⚡ Performance Mode:', CONFIG.PERFORMANCE_MODE ? 'Optimized' : 'Full Features', 'color: #10b981;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3b82f6;');

// ==================== Development Mode Features ====================
if (window.location.hostname === 'localhost') {
    console.log('%c🔧 Development Mode Active', 'color: #f59e0b; font-weight: bold;');

    // Add development helper functions
    window.debugPortfolio = {
        config: CONFIG,
        performance: perf,
        testForm: () => {
            const form = document.getElementById('contactForm');
            if (form) {
                // Fill form with test data
                document.getElementById('name').value = 'Test User';
                document.getElementById('email').value = 'test@example.com';
                document.getElementById('title').value = 'Test Project';
                document.getElementById('message').value = 'This is a test message for development purposes.';
            }
        },
        toggleCursor: () => {
            const dot = document.querySelector('.cursor-dot');
            const ring = document.querySelector('.cursor-ring');
            const display = dot.style.display === 'none' ? 'block' : 'none';
            dot.style.display = display;
            ring.style.display = display;
        }
    };

    console.log('%cDevelopment helpers available: debugPortfolio', 'color: #64748b;');
}

// ==================== Service Worker Registration ====================
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('💾 Service Worker registered successfully');
                trackAnalytics('service_worker_registered');
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// ==================== Final Setup ====================
// Ensure proper cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Track session duration
    trackAnalytics('session_end', {
        duration: Math.round((Date.now() - perf.startTime) / 1000),
        interactions: document.querySelectorAll('.clicked').length
    });
});

// Mark script as fully loaded
perf.mark('script-loaded');
console.log('✅ Script loaded and ready');
