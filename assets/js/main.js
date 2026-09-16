/**
 * NOIRWAVE - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Page Transition & Loader
       ========================================================================== */
    const pageTransition = document.querySelector('.page-transition');
    
    // Simulate short load time (under 1s as requested)
    setTimeout(() => {
        pageTransition.style.opacity = '0';
        pageTransition.style.visibility = 'hidden';
        
        // Trigger initial animations after load
        setTimeout(() => {
            animateHero();
            initScrollAnimations();
        }, 300);
    }, 800);

    /* ==========================================================================
       Hero Animations
       ========================================================================== */
    function animateHero() {
        const revealTexts = document.querySelectorAll('.reveal-text');
        
        revealTexts.forEach((text, index) => {
            setTimeout(() => {
                text.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    /* ==========================================================================
       Custom Cursor (Desktop Only)
       ========================================================================== */
    const cursor = document.querySelector('.custom-cursor');
    const isDesktop = window.matchMedia('(min-width: 992px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isDesktop && !reducedMotion && cursor) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        // Follow mouse
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation
        const animateCursor = () => {
            let distX = mouseX - cursorX;
            let distY = mouseY - cursorY;
            
            cursorX = cursorX + (distX * 0.2);
            cursorY = cursorY + (distY * 0.2);
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
        
        // Hover effects
        const interactiveElements = document.querySelectorAll('input, textarea, select');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-grow');
                
                // Add specific text based on element
                if(el.classList.contains('gallery-img-wrapper')) {
                    cursor.setAttribute('data-text', 'VIEW');
                } else if(el.classList.contains('track-play-btn') || el.classList.contains('play-circle')) {
                    cursor.setAttribute('data-text', 'PLAY');
                } else {
                    cursor.setAttribute('data-text', '');
                }
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-grow');
                cursor.setAttribute('data-text', '');
            });
        });
    }

    /* ==========================================================================
       Header Scroll Effect
       ========================================================================== */
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       Scroll Reveal Animations
       ========================================================================== */
    function initScrollAnimations() {
        if (reducedMotion) return;
        
        const revealElements = document.querySelectorAll('.img-reveal');
        
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const revealOptions = {
            threshold: 0.3,
            rootMargin: "0px 0px -50px 0px"
        };
        
        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    /* ==========================================================================
       Booking Form Validation
       ========================================================================== */
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic frontend validation simulation
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'SENDING...';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                bookingForm.reset();
                
                // Show success message
                formSuccess.classList.remove('d-none');
                
                setTimeout(() => {
                    formSuccess.classList.add('d-none');
                }, 5000);
            }, 1500);
        });
    }
    
    /* ==========================================================================
       Video Modal (Placeholder logic)
       ========================================================================== */
    const playVideoBtn = document.querySelector('.play-circle');
    
    if(playVideoBtn) {
        playVideoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Video modal triggered. In a production environment, this would open a lightbox with the video.");
        });
    }
});

    /* ==========================================================================
       Scroll to Top
       ========================================================================== */
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ==========================================================================
       Active Menu Highlighting
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== null) {
                link.classList.add('active');
            }
        });
    });

