// ==================== Smooth Scrolling & Animations ====================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize animations
  observeElements();
  setupScrollAnimations();
  setupFormHandling();
  setupMobileMenu();
  setupParallax();
});

// ==================== Intersection Observer for Animations ====================

function observeElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe project cards and other elements
  document.querySelectorAll('.project-card, .stat-card, .about-card').forEach(el => {
    observer.observe(el);
  });
}

// ==================== Scroll Animations ====================

function setupScrollAnimations() {
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.style.opacity = '1';
      }
    });
  });
}

// ==================== Form Handling ====================

function setupFormHandling() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        title: formData.get('title'),
        message: formData.get('message')
      };

      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          showNotification('Message sent successfully!', 'success');
          contactForm.reset();
        } else {
          showNotification('Failed to send message', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showNotification('Error sending message', 'error');
      }
    });
  }
}

// ==================== Notification System ====================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-20 right-6 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
    type === 'success' ? 'bg-cyan-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  }`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateY(-20px)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==================== Mobile Menu ====================

function setupMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.querySelector('nav ul');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('hidden');
    });

    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.add('hidden');
      });
    });
  }
}

// ==================== Parallax Effect ====================

function setupParallax() {
  window.addEventListener('scroll', () => {
    const blobs = document.querySelectorAll('.blob');
    const scrollY = window.scrollY;

    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.5;
      blob.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });
}

// ==================== Smooth Scroll for Navigation ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== Active Navigation Link ====================

window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('text-cyan-400');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('text-cyan-400');
    }
  });
});

// ==================== Add Animation on Scroll ====================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .slide-in {
    animation: slideUp 0.6s ease-out forwards;
  }
`;
document.head.appendChild(style);

// ==================== Lazy Load Images ====================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

console.log('✨ Portfolio loaded successfully!');
