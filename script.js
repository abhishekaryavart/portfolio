/**
    Enhanced Portfolio Logic for Abhishek Aryavart
    Includes: Sticky header, Scroll animations, and Contact form handling.
*/

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const animatedElements = document.querySelectorAll('.animate-in');

    // 1. Sticky Header Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Entry Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-show');
                // Optional: stop observing once shown
                // appearanceObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => appearanceObserver.observe(el));

    // 3. Smooth Navigation Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate form submission
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent! ✅';
                btn.style.background = '#10b981'; // Green success
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // 5. Hero Parallax Effect (Subtle)
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            const heroContent = hero.querySelector('.hero-content');
            const heroImg = hero.querySelector('.hero-img');
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
            heroImg.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    });

    console.log("%cPortfolio Loaded Successfully!", "color: #1c4c94; font-weight: bold; font-size: 14px;");
});
