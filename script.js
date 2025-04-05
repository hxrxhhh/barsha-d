document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const DANCE_INTERVAL = 800;
    const DANCE_RANGE = { x: 50, y: 25 };
    const dancers = document.querySelectorAll('.dancer');
    let isFreestyle = false;
    let animationFrame;
  
    // CSS Variables for smooth control
    const root = document.documentElement;
  
    // Audio control
    const audio = document.getElementById('birthday-audio');
    const musicToggle = document.getElementById('music-toggle');
  
    // Initialize dancers
    dancers.forEach(dancer => {
      dancer.style.transform = 'translate(0, 0) rotate(0deg)';
      dancer.setAttribute('role', 'button');
      dancer.setAttribute('tabindex', '0');
      dancer.setAttribute('aria-label', 'Dance animation control');
    });
  
    // Click handler with touch support
    function toggleFreestyle() {
      isFreestyle = !isFreestyle;
      root.style.setProperty('--dance-speed', isFreestyle ? '0.5s' : '1s');
      
      if (isFreestyle) {
        startDance();
        if (audio.paused) audio.play();
      } else {
        cancelAnimationFrame(animationFrame);
        resetPosition();
      }
    }
  
    // Smooth animation using requestAnimationFrame
    function animateDance() {
      if (!isFreestyle) return;
  
      dancers.forEach(dancer => {
        const x = (Math.random() - 0.5) * 2 * DANCE_RANGE.x;
        const y = (Math.random() - 0.5) * 2 * DANCE_RANGE.y;
        const rotate = Math.random() * 360;
        
        dancer.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
      });
  
      animationFrame = requestAnimationFrame(animateDance);
    }
  
    function startDance() {
      cancelAnimationFrame(animationFrame);
      animateDance();
    }
  
    function resetPosition() {
      dancers.forEach(dancer => {
        dancer.style.transform = 'translate(0, 0) rotate(0deg)';
      });
    }
  
    // Event listeners
    dancers.forEach(dancer => {
      dancer.addEventListener('click', toggleFreestyle);
      dancer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') toggleFreestyle();
      });
    });
  
    // Music control
    musicToggle.addEventListener('click', () => {
      audio.paused ? audio.play() : audio.pause();
      musicToggle.textContent = audio.paused ? '🎵 Play Music' : '🎵 Pause Music';
    });
  
    // Touch device detection
    function isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
  
    // Mobile hover prevention
    if (isTouchDevice()) {
      document.body.classList.add('touch-device');
    }
  
    // Cleanup on window close
    window.addEventListener('beforeunload', () => {
      cancelAnimationFrame(animationFrame);
      audio.pause();
    });
  
    // Responsive handling
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationFrame);
      if (isFreestyle) startDance();
    });
  });