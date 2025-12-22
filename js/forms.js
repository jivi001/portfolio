// ==================== Forms Handling ====================
import { CONFIG, perf, debounce } from './core.js';
import { trackAnalytics } from './analytics.js';

export function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (!contactForm) return;

    perf.mark('contact-form-start');

    // Validation
    const fields = ['name', 'email', 'title', 'message'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', debounce(() => {
                if (el.value.length > 0) el.classList.remove('form-error');
            }, 300));
        }
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic Client-side Validation
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        data.timestamp = new Date().toISOString();
        data.user_agent = navigator.userAgent;

        if (!data.name || !data.email || !data.message) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }

        // Loading State
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }

        try {
            console.log('📤 Sending to:', CONFIG.API_BASE_URL + '/api/contact');
            const response = await fetch(CONFIG.API_BASE_URL + '/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                showFormStatus('✅ Message sent! I\'ll be in touch soon.', 'success');
                contactForm.reset();
                trackAnalytics('contact_form_success', { type: data.project_type });
            } else {
                throw new Error('Server returned ' + response.status);
            }
        } catch (error) {
            console.error('Contact error:', error);
            showFormStatus('❌ Failed to send message. Please try again.', 'error');
            trackAnalytics('contact_form_error', { error: error.message });
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        }
    });
}

function showFormStatus(message, type) {
    const statusEl = document.getElementById('formStatus');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = `mt-6 text-center font-semibold rounded-lg p-4 ${type === 'success' ? 'status-success' : 'status-error'}`;
        statusEl.classList.remove('hidden');
        setTimeout(() => statusEl.classList.add('hidden'), 8000);
    }
}
