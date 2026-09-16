/**
 * NOIRWAVE - Events & Countdown JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Countdown Timer
       ========================================================================== */
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');
    
    if (daysEl && hoursEl && minsEl && secsEl) {
        // Set target date (e.g., October 24, 2026)
        // Adjust this dynamically based on data if needed
        const targetDate = new Date("Oct 24, 2026 22:00:00").getTime();
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            
            if (distance < 0) {
                // Event has passed
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minsEl.innerText = "00";
                secsEl.innerText = "00";
                return;
            }
            
            // Time calculations
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display with leading zero
            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minsEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        };
        
        // Initial call
        updateCountdown();
        
        // Update every second
        setInterval(updateCountdown, 1000);
    }

    /* ==========================================================================
       Event Row Hover Images
       ========================================================================== */
    const eventRows = document.querySelectorAll('.event-row');
    
    eventRows.forEach(row => {
        // Get image from data attribute and set as CSS variable for hover effect
        const bgImg = row.getAttribute('data-image');
        if (bgImg) {
            row.style.setProperty('--bg-image', `url('../${bgImg}')`);
        }
    });
});
