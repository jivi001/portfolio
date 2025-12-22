// ==================== UI & Animations ====================
import { CONFIG, perf, throttle } from './core.js';
import { trackAnalytics } from './analytics.js';

export function setupAnimations() {
    perf.mark('animations-start');

    if (CONFIG.REDUCED_MOTION) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
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
                handleSpecialAnimations(entry.target);
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(element => {
        revealObserver.observe(element);
    });

    perf.mark('animations-end');
    perf.measure('animations-setup', 'animations-start', 'animations-end');
}

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

    trackAnalytics('element_revealed', {
        element: element.id || element.className.split(' ')[0]
    });
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

export function setupPremiumCursor() {
    if (CONFIG.TOUCH_DEVICE || window.innerWidth < 768) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    if (!cursorDot || !cursorRing) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let isHovering = false;

    const handleMouseMove = throttle((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, 16);

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

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

    const interactiveSelector = 'a, button, .project-card, .skill-card, input, textarea, select';
    document.querySelectorAll(interactiveSelector).forEach(el => {
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
}

export function setupMagneticButtons() {
    if (CONFIG.TOUCH_DEVICE) return;

    document.querySelectorAll('.magnetic').forEach(button => {
        let isHovering = false;

        button.addEventListener('mouseenter', () => isHovering = true);
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

export function setupParallaxEffect() {
    if (CONFIG.REDUCED_MOTION || CONFIG.PERFORMANCE_MODE) return;

    const parallaxElements = document.querySelectorAll('.orb, .float-animation');
    const handleScroll = throttle(() => {
        const scrollY = window.scrollY;
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16);

    window.addEventListener('scroll', handleScroll, { passive: true });
}

export function setupPageTransition() {
    let transition = document.getElementById('pageTransition');
    if (!transition) {
        transition = document.createElement('div');
        transition.id = 'pageTransition';
        transition.innerHTML = '<div id="loadingText">Loading...</div>';
        document.body.appendChild(transition);
    }

    const loadingText = document.getElementById('loadingText');
    const loadingSteps = ['Loading assets...', 'Initializing...', 'Almost ready...'];
    let currentStep = 0;

    const loadingInterval = setInterval(() => {
        if (loadingText && currentStep < loadingSteps.length) {
            loadingText.textContent = loadingSteps[currentStep++];
        }
    }, 150);

    window.addEventListener('load', () => {
        clearInterval(loadingInterval);
        setTimeout(() => transition.classList.remove('active'), 500);
    });

    document.querySelectorAll('a[href$=".html"]:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            transition.classList.add('active');
            if (loadingText) loadingText.textContent = 'Loading page...';
            setTimeout(() => window.location.href = link.href, 400);
        });
    });
}
