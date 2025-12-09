// Create floating particles
const particlesContainer = document.getElementById('particlesContainer');
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    particlesContainer.appendChild(particle);
}

// Create floating orbs
const orbsContainer = document.getElementById('orbsContainer');
const orbColors = ['#ff0080', '#ff8c00', '#40e0d0', '#9d4edd', '#06ffa5'];
for (let i = 0; i < 5; i++) {
    const orb = document.createElement('div');
    orb.className = 'orb';
    orb.style.left = Math.random() * 100 + '%';
    orb.style.top = Math.random() * 100 + '%';
    orb.style.width = (100 + Math.random() * 200) + 'px';
    orb.style.height = orb.style.width;
    orb.style.background = orbColors[i];
    orb.style.animationDelay = i * 1.5 + 's';
    orb.style.animationDuration = (6 + Math.random() * 4) + 's';
    orbsContainer.appendChild(orb);
}

// Enhanced firework creation
function createFirework(x, y) {
    const colors = ['#ff0080', '#ff8c00', '#40e0d0', '#9d4edd', '#06ffa5', '#ffff00'];
    const particles = 40;
    
    for (let i = 0; i < particles; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        firework.style.boxShadow = `0 0 10px ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        const angle = (Math.PI * 2 * i) / particles;
        const velocity = 60 + Math.random() * 80;
        firework.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        firework.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
        
        document.body.appendChild(firework);
        
        setTimeout(() => firework.remove(), 1200);
    }
}

// Random fireworks
setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    createFirework(x, y);
}, 1500);

// Countdown logic - ACTUAL NEW YEAR 2026
const newYear = new Date('January 1, 2026 00:00:00').getTime();
let previousValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };
let finalCountdownActive = false;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = newYear - now;

    if (distance < 0) {
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('celebration').style.display = 'block';
        
        // Change year to 2026 after countdown finishes
        document.getElementById('year-title').textContent = '✨ 2026 ✨';
        
        // Intense celebration fireworks
        setInterval(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    createFirework(x, y);
                }, i * 100);
            }
        }, 500);
        return;
    }

    // Check if we're in final 20 seconds
    const totalSeconds = Math.floor(distance / 1000);
    if (totalSeconds <= 20 && !finalCountdownActive) {
        finalCountdownActive = true;
        document.body.classList.add('final-countdown');
        
        // Hide days, hours, minutes
        document.getElementById('days-unit').style.display = 'none';
        document.getElementById('hours-unit').style.display = 'none';
        document.getElementById('minutes-unit').style.display = 'none';
        
        // Rapid fire fireworks for final countdown
        setInterval(() => {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight * 0.6;
                    createFirework(x, y);
                }, i * 100);
            }
        }, 800);
    } else if (totalSeconds > 20) {
        // Show all units when more than 20 seconds
        document.getElementById('days-unit').style.display = 'flex';
        document.getElementById('hours-unit').style.display = 'flex';
        document.getElementById('minutes-unit').style.display = 'flex';
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Animate number changes
    const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    const values = { days, hours, minutes, seconds };

    Object.keys(values).forEach(key => {
        if (previousValues[key] !== values[key]) {
            elements[key].style.animation = 'none';
            setTimeout(() => {
                elements[key].style.animation = 'numberFlip 0.6s ease';
                elements[key].textContent = String(values[key]).padStart(2, '0');
            }, 10);
            previousValues[key] = values[key];
        }
    });
}

updateCountdown();
setInterval(updateCountdown, 1000);

