// ==================== Analytics System ====================
import { CONFIG, perf } from './core.js';

export function setupAnalytics() {
    // Privacy check
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

    // Track engagement
    let engagementTimer = 0;
    const trackEngagement = setInterval(() => {
        engagementTimer += 5;
        if (engagementTimer === 30) trackAnalytics('engagement_30s');
        if (engagementTimer === 60) {
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

    // Session End
    window.addEventListener('beforeunload', () => {
        trackAnalytics('session_end', {
            duration: Math.round((Date.now() - perf.startTime) / 1000)
        });
    });
}

export function trackAnalytics(event, properties = {}) {
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

        navigator.sendBeacon(CONFIG.API_BASE_URL + '/api/analytics', data);
    }
}
