// Crazy background animation
const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const PARTICLE_COUNT = 100;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 3;
        this.vy = (Math.random() - 0.5) * 3;
        this.radius = Math.random() * 5 + 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.life = 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.color = `hsl(${(Date.now() * 0.1) % 360}, 100%, 50%)`;
        this.radius = Math.abs(Math.sin(Date.now() * 0.002)) * 5 + 1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

// Original functionality
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('DOMContentLoaded', () => {
    const danceButton = document.getElementById('danceButton');
    const photos = document.querySelectorAll('.photo');
    const audio = document.getElementById('birthdaySong');

    danceButton.addEventListener('click', () => {
        photos.forEach(photo => {
            photo.classList.toggle('dance-animation');
        });

        if (danceButton.textContent.includes('Party')) {
            danceButton.textContent = 'Stop the Party! 🛑';
            audio.play();
        } else {
            danceButton.textContent = "Let's Party! 🕺💃";
            audio.pause();
        }
    });

    photos.forEach(photo => {
        photo.addEventListener('mouseover', () => {
            photo.style.transform = 'scale(1.2) rotate(5deg)';
            photo.style.filter = 'hue-rotate(90deg)';
        });
        
        photo.addEventListener('mouseout', () => {
            photo.style.transform = 'scale(1) rotate(0deg)';
            photo.style.filter = 'none';
        });
    });
});