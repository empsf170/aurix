/**
 * NOIRWAVE - Gallery & Lightbox JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Lightbox Functionality
       ========================================================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-img-wrapper');
    
    if (lightbox && lightboxImg && closeLightbox) {
        
        // Open Lightbox
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.getAttribute('data-src');
                const captionEl = item.querySelector('h4');
                const yearEl = item.querySelector('.text-muted');
                
                if (imgSrc) {
                    lightboxImg.src = imgSrc;
                    
                    if (captionEl && yearEl) {
                        lightboxCaption.innerText = `${captionEl.innerText} — ${yearEl.innerText}`;
                    } else {
                        lightboxCaption.innerText = '';
                    }
                    
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });
        
        // Close Lightbox
        const close = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightboxImg.src = '';
                document.body.style.overflow = '';
            }, 400); // Wait for transition
        };
        
        closeLightbox.addEventListener('click', close);
        
        // Close on background click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                close();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                close();
            }
        });
    }
});
