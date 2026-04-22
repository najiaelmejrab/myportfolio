// Portfolio Filter
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                }
            });
        });
    });

    // Set first filter button as active on load
    if (filterBtns.length > 0) {
        filterBtns[0].classList.add('active');
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }

        // Success message
        console.log('Form Data:', {
            name,
            email,
            subject,
            message
        });

        showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
        contactForm.reset();

        // Clear message after 5 seconds
        setTimeout(() => {
            document.getElementById('formMessage').style.display = 'none';
        }, 5000);
    });

    function showFormMessage(text, type) {
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link based on current page
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call function on page load
updateActiveNavLink();

// Hamburger Menu Functionality
function initHamburgerMenu() {
    const navbar = document.querySelector('.navbar');
    const container = navbar.querySelector('.container');
    const navBrand = container.querySelector('.nav-brand');
    const navMenu = container.querySelector('.nav-menu');
    
    if (!navBrand || !navMenu) return;

    // Remove existing hamburger if any
    const existingHamburger = container.querySelector('.hamburger');
    if (existingHamburger) {
        existingHamburger.remove();
    }

    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    hamburger.style.order = '3'; // Place after nav-menu in flex

    // Insert hamburger at end of container (right edge)
    container.appendChild(hamburger);

    // Toggle menu function
    function toggleMenu() {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    }

    hamburger.addEventListener('click', toggleMenu);

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Close menu on window resize > 768px
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        }, 250);
    });
}

// Initialize hamburger menu on DOM load
document.addEventListener('DOMContentLoaded', initHamburgerMenu);

// Add scroll animation for elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-card, .achievement-card, .blog-post');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Add fadeInUp animation to CSS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Call animation function
animateOnScroll();

document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    const projectGroups = document.querySelectorAll(".project-group");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            // Active button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            portfolioItems.forEach(item => {
                const category = item.getAttribute("data-category");

                if (filter === "all" || category === filter) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

            // Show all groups for all filters
            projectGroups.forEach(group => {
                group.style.display = "block";
            });
        });
    });
});
