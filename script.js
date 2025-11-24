// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Support both click and touch events for better Android compatibility
const toggleMenu = () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
};

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchend', (e) => {
        e.preventDefault();
        toggleMenu();
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links (Android compatible)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const handleScroll = function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Use requestAnimationFrame for better Android performance
            requestAnimationFrame(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    };
    
    anchor.addEventListener('click', handleScroll);
    // Also support touch for Android
    anchor.addEventListener('touchend', (e) => {
        e.preventDefault();
        handleScroll.call(anchor, e);
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
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

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your EmailJS public key
})();

// Form submission handler
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('user_name').value;
        const email = document.getElementById('user_email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Show loading message
        formMessage.textContent = 'Sending...';
        formMessage.className = 'form-message sending';
        formMessage.style.display = 'block';
        
        // Prepare email parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'ruthrasamy6@gmail.com'
        };
        
        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                // Success
                formMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, function(error) {
                // Error
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or email me directly at ruthrasamy6@gmail.com';
                formMessage.className = 'form-message error';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-card, .project-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Uncomment to enable typing effect
    // typeWriter();
}

// Add active class to nav links on page load
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetLink = document.querySelector(`.nav-menu a[href="${hash}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    } else {
        const homeLink = document.querySelector('.nav-menu a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
});

// Android-specific optimizations
// Prevent double-tap zoom on buttons and links
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Handle viewport height changes when Android keyboard appears
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Improve scroll performance on Android
let ticking = false;
const optimizedScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }
    ticking = false;
};

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(optimizedScroll);
        ticking = true;
    }
}, { passive: true });

