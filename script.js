/**
 * Modern Portfolio Script
 * Features: Typing animation, Counter animations, Sticky nav, Smooth scrolling, Form handling
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initNavigation();
    initTypingAnimation();
    initCounterAnimation();
    initScrollAnimations();
    initFormHandling();
    initScrollReveal();
});

// ============ Navigation ============
function initNavigation() {
    const navbar = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');

    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CV button smooth scroll
    const cvBtn = document.querySelector('.btn-cv');
    if (cvBtn) {
        cvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offset = 80;
                const elementPosition = contactSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// ============ Typing Animation ============
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const titles = ['Data Analyst', 'Python Developer', 'Flask Developer'];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenTitles = 2000;

    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentTitle.substring(0, charIndex);

        let speed = typingSpeed;

        if (isDeleting) {
            speed = deletingSpeed;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            speed = delayBetweenTitles;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            speed = 100;
        }

        setTimeout(type, speed);
    }

    type();
}

// ============ Counter Animation ============
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const counter = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(counter);
                        entry.target.classList.add('counted');
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);

                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => counterObserver.observe(number));
}

// ============ Scroll Reveal Animations ============
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-fade-in').forEach(element => {
        revealObserver.observe(element);
    });
}

// ============ Progress Bars Animation ============
function initScrollAnimations() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const observerOptions = {
        threshold: 0.5
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => progressObserver.observe(bar));
}

// ============ Form Handling ============
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formInputs = contactForm.querySelectorAll('.form-input');
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.textContent;

        // Validate form
        let isValid = true;
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4da6';
            } else {
                input.style.borderColor = 'rgba(0, 195, 255, 0.2)';
            }
        });

        if (!isValid) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        // Simulate sending
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            submitBtn.textContent = 'Message Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #00c3ff, #ff4da6)';
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.style.borderColor = 'rgba(0, 195, 255, 0.2)';
            });

            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);

            showNotification('Message sent successfully!', 'success');
        }, 1500);
    });
}

// ============ Notification Helper ============
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00c3ff, #ff4da6)' : '#ff4da6'};
        color: #07182E;
        border-radius: 8px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 8px 20px rgba(0, 195, 255, 0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ Add Animations to Stylesheet ============
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    /* Smooth animations for all transitions */
    * {
        transition-property: background-color, border-color, box-shadow, transform, opacity;
    }
`;
document.head.appendChild(style);

// ============ Performance Logging ============
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('%c✨ Portfolio Loaded Successfully!', 'color: #00c3ff; font-weight: bold; font-size: 16px;');
    console.log('%cTheme: Modern Dark | Colors: #07182E, #00c3ff, #ff4da6', 'color: #ff4da6; font-style: italic;');
}
