/**
 * NOIRWAVE - Audio Player JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       Floating Audio Player Setup
       ========================================================================== */
    const mainAudio = document.getElementById('mainAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn ? playPauseBtn.querySelector('i') : null;
    const currentTrackName = document.getElementById('currentTrackName');
    const audioProgress = document.getElementById('audioProgress');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');
    const volumeSlider = document.getElementById('volumeSlider');
    const floatingPlayer = document.querySelector('.floating-player');
    
    // All track items on the page
    const trackItems = document.querySelectorAll('.track-item');
    const trackPlayBtns = document.querySelectorAll('.track-play-btn');
    const listenHeroBtn = document.querySelector('.listen-hero-btn');
    const listenHeaderBtn = document.querySelector('.listen-btn');
    
    let isPlaying = false;
    
    // Ensure elements exist before proceeding
    if (!mainAudio || !playPauseBtn) return;
    
    /* ==========================================================================
       Format Time Helper
       ========================================================================== */
    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return "00:00";
        const mins = Math.floor(timeInSeconds / 60);
        const secs = Math.floor(timeInSeconds % 60);
        return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    };
    
    /* ==========================================================================
       Main Player Controls
       ========================================================================== */
    const togglePlay = () => {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    };
    
    const playAudio = () => {
        // Show player if hidden
        floatingPlayer.classList.add('visible');
        
        mainAudio.play()
            .then(() => {
                isPlaying = true;
                playPauseIcon.className = 'ri-pause-fill';
                
                // Update playing state on track list if applicable
                updateTrackListState();
            })
            .catch(error => {
                console.error("Audio playback failed:", error);
                // Fallback for visual demonstration if audio file is missing
                isPlaying = true;
                playPauseIcon.className = 'ri-pause-fill';
                simulateAudioProgress();
            });
    };
    
    const pauseAudio = () => {
        mainAudio.pause();
        isPlaying = false;
        playPauseIcon.className = 'ri-play-fill';
        
        // Stop equalizer animation on tracks
        trackItems.forEach(item => item.classList.remove('playing'));
    };
    
    // Add event listeners to main play button
    playPauseBtn.addEventListener('click', togglePlay);
    
    /* ==========================================================================
       Progress and Volume
       ========================================================================== */
    // Update progress bar as audio plays
    mainAudio.addEventListener('timeupdate', () => {
        const percent = (mainAudio.currentTime / mainAudio.duration) * 100;
        audioProgress.style.width = `${percent}%`;
        currentTimeEl.innerText = formatTime(mainAudio.currentTime);
    });
    
    // Set total time when metadata loads
    mainAudio.addEventListener('loadedmetadata', () => {
        totalTimeEl.innerText = formatTime(mainAudio.duration);
    });
    
    // Audio ended
    mainAudio.addEventListener('ended', () => {
        pauseAudio();
        audioProgress.style.width = '0%';
        currentTimeEl.innerText = "00:00";
    });
    
    // Click on progress bar to seek
    if (progressContainer) {
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = mainAudio.duration;
            
            if (!isNaN(duration)) {
                mainAudio.currentTime = (clickX / width) * duration;
            }
        });
    }
    
    // Volume Control
    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            mainAudio.volume = e.target.value;
        });
    }
    
    /* ==========================================================================
       Track List Integration
       ========================================================================== */
    // Helper to update track list visual state based on current playing track
    const updateTrackListState = () => {
        trackItems.forEach(item => {
            const itemSrc = item.getAttribute('data-src');
            const currentSrc = mainAudio.getAttribute('src');
            
            if (itemSrc && currentSrc && itemSrc === currentSrc && isPlaying) {
                item.classList.add('playing');
                item.querySelector('i').className = 'ri-pause-fill';
            } else {
                item.classList.remove('playing');
                item.querySelector('i').className = 'ri-play-fill';
            }
        });
    };
    
    // Handle clicks on track play buttons in the tracklist
    trackPlayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const trackItem = this.closest('.track-item');
            const trackSrc = trackItem.getAttribute('data-src');
            const trackTitle = trackItem.getAttribute('data-title');
            const currentSrc = mainAudio.getAttribute('src');
            
            // If clicking the currently loaded track
            if (trackSrc && trackSrc === currentSrc) {
                togglePlay();
                updateTrackListState();
            } 
            // If clicking a new track
            else if (trackSrc) {
                // Remove playing class from all
                trackItems.forEach(t => {
                    t.classList.remove('playing');
                    t.querySelector('.track-play-btn i').className = 'ri-play-fill';
                });
                
                // Update player details
                mainAudio.src = trackSrc;
                currentTrackName.innerText = trackTitle;
                
                // Load and play
                mainAudio.load();
                playAudio();
                
                // Add playing class to this track
                trackItem.classList.add('playing');
                this.querySelector('i').className = 'ri-pause-fill';
            }
        });
    });
    
    /* ==========================================================================
       Global Buttons (Hero, Header)
       ========================================================================== */
    const handleGlobalListenClick = (e) => {
        e.preventDefault();
        floatingPlayer.classList.add('visible');
        if (!isPlaying) {
            playAudio();
        }
    };
    
    if (listenHeroBtn) listenHeroBtn.addEventListener('click', handleGlobalListenClick);
    if (listenHeaderBtn) listenHeaderBtn.addEventListener('click', handleGlobalListenClick);
    
    /* ==========================================================================
       Fallback for Missing Audio Files (Visual Demo only)
       ========================================================================== */
    let demoInterval;
    let demoProgress = 0;
    
    const simulateAudioProgress = () => {
        clearInterval(demoInterval);
        demoInterval = setInterval(() => {
            if (isPlaying) {
                demoProgress += 0.5; // Simulate progress
                if (demoProgress >= 100) {
                    demoProgress = 0;
                    pauseAudio();
                }
                audioProgress.style.width = `${demoProgress}%`;
                
                // Simulate time updates
                let mockSecs = Math.floor((demoProgress / 100) * 402); // 402s = 06:42
                currentTimeEl.innerText = formatTime(mockSecs);
            }
        }, 1000);
    };
});
