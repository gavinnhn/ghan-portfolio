// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
});

// Mobile menu toggle - ensure it works
(function() {
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!hamburger || !navMenu) {
            console.log('Hamburger or nav menu not found');
            return;
        }
        
        // Hamburger click handler
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active')) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });

        // Close mobile menu when clicking on a nav link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        // DOM already loaded
        initMobileMenu();
    }
})();

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

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

// Observe portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Portfolio items are now links, so no need for click handlers

// Email popup functionality
const emailPopup = document.getElementById('email-popup');
const emailLink = document.querySelector('.email-link');
const closePopup = document.querySelector('.email-popup-close');
const copyEmailBtn = document.getElementById('copy-email-btn');
const emailAddress = document.getElementById('email-address');

if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        e.preventDefault();
        emailPopup.classList.add('active');
    });
}

if (closePopup) {
    closePopup.addEventListener('click', function() {
        emailPopup.classList.remove('active');
    });
}

// Close popup when clicking outside
emailPopup.addEventListener('click', function(e) {
    if (e.target === emailPopup) {
        emailPopup.classList.remove('active');
    }
});

// Copy email to clipboard
if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function() {
        const email = emailAddress.textContent;
        navigator.clipboard.writeText(email).then(() => {
            copyEmailBtn.textContent = 'copied!';
            copyEmailBtn.classList.add('copied');
            setTimeout(() => {
                copyEmailBtn.textContent = 'copy email';
                copyEmailBtn.classList.remove('copied');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email:', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            copyEmailBtn.textContent = 'copied!';
            copyEmailBtn.classList.add('copied');
            setTimeout(() => {
                copyEmailBtn.textContent = 'copy email';
                copyEmailBtn.classList.remove('copied');
            }, 2000);
        });
    });
}

