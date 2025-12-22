// ==================== Navigation & Scroll ====================
import { CONFIG, throttle } from './core.js';
import { trackAnalytics } from './analytics.js';

export function setupNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                history.pushState(null, null, targetId);
                trackAnalytics('navigation_click', { target: targetId });
            }
        });
    });

    // Handle hash on load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

export function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileMenuBtn || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.remove('hidden', 'translate-x-full');
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        trackAnalytics('mobile_menu_opened');
    }

    function closeMenu() {
        mobileMenu.classList.add('hidden', 'translate-x-full');
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.getAttribute('aria-hidden') === 'false';
        isOpen ? closeMenu() : openMenu();
    });

    closeMobileMenu?.addEventListener('click', closeMenu);

    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

export function setupScrollEffects() {
    const nav = document.getElementById('mainNav');

    // Scroll Indicator
    const indicator = document.createElement('div');
    indicator.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-50 transition-all duration-300';
    indicator.style.width = '0%';
    document.body.appendChild(indicator);

    let lastScrollY = window.scrollY;

    const scrollHandler = throttle(() => {
        const scrollY = window.scrollY;

        // Nav Glass Effect
        if (scrollY > CONFIG.SCROLL_OFFSET) {
            nav?.classList.add('scrolled');
        } else {
            nav?.classList.remove('scrolled');
        }

        // Active Link
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = scrollY + 200;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                const currentId = section.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.toggle('text-cyan-400', link.getAttribute('href') === `#${currentId}`);
                });
            }
        });

        // Scroll Indicator
        const scrollPercent = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        indicator.style.width = Math.min(scrollPercent, 100) + '%';

        lastScrollY = scrollY;
    }, 16);

    window.addEventListener('scroll', scrollHandler, { passive: true });
}
