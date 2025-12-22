// ==================== Core System ====================

// Configuration
export const CONFIG = {
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
        // console.log(`📊 Performance Mark: ${name} at ${Math.round(performance.now())}ms`);
    }

    measure(name, startMark, endMark) {
        performance.measure(name, startMark, endMark);
        const measure = performance.getEntriesByName(name)[0];
        this.metrics.set(name, Math.round(measure.duration));
        // console.log(`⚡ ${name}: ${Math.round(measure.duration)}ms`);
        return measure.duration;
    }

    getLoadTime() {
        return Math.round(performance.now() - this.startTime);
    }
}

export const perf = new PerformanceMonitor();
perf.mark('script-start');

// Utilities
export function debounce(func, wait) {
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

export function throttle(func, limit) {
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

// Module Imports
import { setupNavigation, setupMobileMenu, setupScrollEffects } from './navigation.js';
import { setupAnimations, setupPremiumCursor, setupMagneticButtons, setupParallaxEffect, setupPageTransition } from './ui.js';
import { setupContactForm } from './forms.js';
import { setupAnalytics, trackAnalytics } from './analytics.js';

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    perf.mark('dom-ready');
    initializeApp();
});

function initializeApp() {
    perf.mark('app-init-start');
    console.log('🚀 Initializing Premium Portfolio v2.0 (Modular)...');

    try {
        // Core Features
        setupScrollEffects();
        setupNavigation();
        setupAnimations();
        setupContactForm();
        setupMobileMenu();
        setupAccessibility();

        // Progressive Enhancement
        if (!CONFIG.PERFORMANCE_MODE && !CONFIG.REDUCED_MOTION) {
            setupPremiumCursor();
            setupMagneticButtons();
            setupParallaxEffect();
            setupPageTransition();
        }

        // Analytics
        setupAnalytics();

        perf.mark('app-init-end');
        perf.measure('app-initialization', 'app-init-start', 'app-init-end');

        console.log('✨ Portfolio Initialized Successfully!');
        console.log(`⚡ Total load time: ${perf.getLoadTime()}ms`);

    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

function setupAccessibility() {
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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.getAttribute('aria-hidden') === 'false') {
                document.getElementById('closeMobileMenu')?.click();
            }
        }
    });
}

// Service Worker Registration
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

// Global Branding
console.log('%c🚀 Jivitesh Portfolio v2.0', 'font-size: 20px; font-weight: bold; color: #06b6d4; text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);');
