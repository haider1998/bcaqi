// ===========================
// BCAQI - Refined JavaScript
// All Issues Fixed + Enhanced
// ===========================

'use strict';

// ===========================
// Loading Screen
// ===========================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 600);
});

// ===========================
// Mobile Navigation - Enhanced
// ===========================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link, .nav-cta');

// Toggle mobile menu
navToggle?.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');

    if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translateY(12px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        document.body.style.overflow = 'hidden';
    } else {
        resetNavToggle(spans);
    }
});

// Reset nav toggle animation
function resetNavToggle(spans) {
    spans.forEach(span => span.style.transform = '');
    spans[1].style.opacity = '1';
    document.body.style.overflow = '';
}

// Close menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        resetNavToggle(spans);
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        resetNavToggle(spans);
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        resetNavToggle(spans);
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
// Animated Counter - Improved
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
        const thousands = num / 1000;
        return thousands % 1 === 0 ? thousands + 'K' : thousands.toFixed(1) + 'K';
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
        disable: function() {
            // Disable on mobile if performance is an issue
            return window.innerWidth < 768;
        }
    });
}

// ===========================
// Image Lazy Loading with Error Handling
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
        this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Cdefs%3E%3ClinearGradient id='grad${index}' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23${color};stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23${color};stop-opacity:0.7' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad${index})' width='800' height='600'/%3E%3Ctext fill='white' font-family='Inter, sans-serif' font-size='28' font-weight='700' x='50%25' y='45%25' text-anchor='middle' dy='.3em'%3EBCAQI Event%3C/text%3E%3Ctext fill='white' font-family='Inter, sans-serif' font-size='20' font-weight='600' x='50%25' y='55%25' text-anchor='middle' dy='.3em'%3ECommunity Gathering%3C/text%3E%3C/svg%3E`;
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
// Active Nav Link Highlighting
// ===========================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
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
// Scroll Progress Indicator
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
// Analytics Event Tracking
// ===========================
function trackEvent(eventName, eventData = {}) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Console log for development
    if (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.includes('github.io')) {
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
// Performance Monitoring
// ===========================
if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    try {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('⚡ LCP:', Math.round(entry.renderTime || entry.loadTime), 'ms');
            }
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        console.log('Performance monitoring not available');
    }
}

// Log page load time
window.addEventListener('load', () => {
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('⚡ Page Load Time:', pageLoadTime + 'ms');

        // Track page load performance
        trackEvent('page_load', {
            load_time: pageLoadTime,
            device: isMobile() ? 'mobile' : 'desktop'
        });
    }
});

// ===========================
// Device Detection
// ===========================
function isMobile() {
    return /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

if (isMobile()) {
    document.body.classList.add('mobile-device');
}

// ===========================
// Prevent Layout Shift
// ===========================
// Add min-height to sections on load to prevent CLS
window.addEventListener('load', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const height = section.offsetHeight;
        section.style.minHeight = height + 'px';
    });
});

// ===========================
// Enhanced Error Handling
// ===========================
window.addEventListener('error', (e) => {
    console.error('Error caught:', e.message);
    trackEvent('javascript_error', {
        error_message: e.message,
        error_line: e.lineno
    });
});

// ===========================
// Service Worker Registration
// ===========================
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
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
// Intersection Observer for Fade-in Effects
// ===========================
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe fade elements (if AOS is not loaded)
if (typeof AOS === 'undefined') {
    document.querySelectorAll('.feature-card, .community-card, .project-card-large').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
}

// ===========================
// Console Art & Branding
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
    '%c💼 Interested in joining our community?',
    'color: #10b981; font-size: 16px; font-weight: bold; margin-top: 10px;'
);

console.log(
    '%c📧 Email: bcaqihub@gmail.com',
    'color: #6b7280; font-size: 14px;'
);

console.log(
    '%c🌐 Website: https://haider1998.github.io/bcaqi/',
    'color: #6b7280; font-size: 14px;'
);

console.log(
    '%c🔧 Built with modern web technologies',
    'color: #9ca3af; font-size: 12px; font-style: italic;'
);

// ===========================
// Keyboard Shortcuts
// ===========================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K = Quick search (future feature)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        console.log('Search feature coming soon!');
    }
});

// ===========================
// Prefetch Important Resources
// ===========================
function prefetchResource(url) {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
}

// Prefetch external links on hover
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('mouseenter', () => {
        prefetchResource(link.href);
    }, { once: true });
});

// ===========================
// Export Functions for Global Use
// ===========================
window.BCAQI = {
    showToast,
    trackEvent,
    formatNumber,
    isMobile
};

// ===========================
// Initialize All Features
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ BCAQI Website Initialized');
    console.log('⚡ All systems operational');
    console.log('📊 Analytics ready');
    console.log('🎨 Animations loaded');

    // Track page view
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        device: isMobile() ? 'mobile' : 'desktop'
    });
});

// ===========================
// Online/Offline Detection
// ===========================
window.addEventListener('online', () => {
    showToast('✓ Connection restored');
});

window.addEventListener('offline', () => {
    showToast('⚠ No internet connection', 5000);
});

// ===========================
// Tab Visibility Change
// ===========================
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('User left tab');
        trackEvent('tab_hidden');
    } else {
        console.log('User returned to tab');
        trackEvent('tab_visible');
    }
});

// ===========================
// Form Submission Handler (if needed in future)
// ===========================
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        trackEvent('form_submission', {
            form_id: form.id || 'unnamed_form'
        });
    });
});

// ===========================
// Auto-hide scroll indicator after scroll
// ===========================
let hasScrolled = false;
window.addEventListener('scroll', () => {
    if (!hasScrolled && window.pageYOffset > 100) {
        hasScrolled = true;
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.visibility = 'hidden';
        }
    }
});

// ===========================
// Smooth Entrance Animation
// ===========================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.3s ease';
        document.body.style.opacity = '1';
    });
});

// ===========================
// END OF SCRIPT
// ===========================
console.log('🎉 BCAQI JavaScript loaded successfully');
