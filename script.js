// ===========================
// BCAQI - Ultra-Premium JavaScript
// Performance Optimized
// ===========================

'use strict';

// ===========================
// Loading Screen
// ===========================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 800);
});

// ===========================
// Mobile Navigation
// ===========================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(12px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        document.body.style.overflow = 'hidden';
    } else {
        spans.forEach(span => span.style.transform = '');
        spans[1].style.opacity = '1';
        document.body.style.overflow = '';
    }
});

// Close menu when clicking on links
document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.style.transform = '');
        spans[1].style.opacity = '1';
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.style.transform = '');
        spans[1].style.opacity = '1';
        document.body.style.overflow = '';
    }
});

// ===========================
// Navbar Scroll Effect
// ===========================
const mainNav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===========================
// Back to Top Button
// ===========================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Smooth Scroll for Anchor Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// Animated Counter
// ===========================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target) + '+';
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current)) + '+';
        }
    }, 16);
};

const formatNumber = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
};

// Intersection Observer for Counter Animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ===========================
// AOS (Animate On Scroll) Initialization
// ===========================
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
    });
}

// ===========================
// Image Lazy Loading with Placeholders
// ===========================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// Handle image load errors with beautiful placeholders
document.querySelectorAll('.gallery-item img').forEach((img, index) => {
    img.onerror = function() {
        const colors = ['3b82f6', '8b5cf6', '10b981', 'f59e0b', 'ef4444', '06b6d4'];
        const color = colors[index % colors.length];
        this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23${color};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23${color};stop-opacity:0.7' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad${index})' width='800' height='600'/%3E%3Ctext fill='white' font-family='Inter, sans-serif' font-size='24' font-weight='700' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EEvent ${index + 1}%3C/text%3E%3Ctext fill='rgba(255,255,255,0.7)' font-family='Inter, sans-serif' font-size='16' font-weight='500' x='50%25' y='60%25' text-anchor='middle' dy='.3em'%3EBCAQI Community%3C/text%3E%3C/svg%3E`;
    };
});

// ===========================
// Email Copy to Clipboard
// ===========================
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (navigator.clipboard) {
            e.preventDefault();
            const email = link.textContent.trim();
            navigator.clipboard.writeText(email).then(() => {
                showToast('✓ Email copied to clipboard!');
                // Still open mailto after short delay
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            }).catch(() => {
                // Fallback - just open mailto
                window.location.href = link.href;
            });
        }
    });
});

// ===========================
// Toast Notification System
// ===========================
function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: #0a0a0a;
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Toast animations
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(toastStyle);

// ===========================
// Analytics Event Tracking (Optional)
// ===========================
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Console log for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('📊 Event:', eventName, eventData);
    }
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('cta_click', {
            button_text: button.textContent.trim(),
            button_location: button.closest('section')?.id || 'navigation',
            button_href: button.getAttribute('href')
        });
    });
});

// Track external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('external_link', {
            link_url: link.href,
            link_text: link.textContent.trim()
        });
    });
});

// ===========================
// Scroll Progress Indicator (Optional)
// ===========================
function updateScrollProgress() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    let progressBar = document.getElementById('scrollProgress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'scrollProgress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${scrolled}%;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
            z-index: 9999;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ===========================
// Keyboard Shortcuts
// ===========================
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.style.transform = '');
        spans[1].style.opacity = '1';
        document.body.style.overflow = '';
    }

    // Press '/' to focus on first CTA (join button)
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        document.querySelector('.nav-cta')?.focus();
    }
});

// ===========================
// Performance Monitoring
// ===========================
if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('⚡ LCP:', entry.renderTime || entry.loadTime);
        }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// Log page load time
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('⚡ Page Load Time:', pageLoadTime + 'ms');
    }
});

// ===========================
// Service Worker Registration (PWA)
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// ===========================
// Detect Mobile Device
// ===========================
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    document.body.classList.add('mobile-device');
}

// ===========================
// Console Art & Message
// ===========================
console.log(
    '%c' + `
╔═══════════════════════════════════════╗
║                                       ║
║   ██████╗  ██████╗ █████╗  ██████╗ ██║
║   ██╔══██╗██╔════╝██╔══██╗██╔═══██╗██║
║   ██████╔╝██║     ███████║██║   ██║██║
║   ██╔══██╗██║     ██╔══██║██║▄▄ ██║██║
║   ██████╔╝╚██████╗██║  ██║╚██████╔╝██║
║   ╚═════╝  ╚═════╝╚═╝  ╚═╝ ╚══▀▀═╝ ╚═╝
║                                       ║
║   Global AI & Quantum Ecosystem       ║
║   Built in India 🇮🇳 for the World 🌍  ║
║                                       ║
╚═══════════════════════════════════════╝
`,
    'color: #2563eb; font-family: monospace; font-size: 10px; line-height: 1.5;'
);

console.log(
    '%c💼 Interested in joining our team?',
    'color: #10b981; font-size: 16px; font-weight: bold; margin-top: 10px;'
);

console.log(
    '%c📧 Email: bcaqihub@gmail.com',
    'color: #6b7280; font-size: 14px;'
);

console.log(
    '%c🌐 Website: bcaqi.com',
    'color: #6b7280; font-size: 14px;'
);

// ===========================
// Initialize All Features
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ BCAQI Website Initialized');
    console.log('⚡ All systems operational');

    // Add active class to current nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// Add active state styling
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: var(--accent) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// ===========================
// Export functions for external use
// ===========================
window.BCAQI = {
    showToast,
    trackEvent,
    formatNumber
};
