const startBtn = document.getElementById('start-btn');
const scannerSection = document.getElementById('scanner-section');
const resultSection = document.getElementById('result-section');
const logContent = document.getElementById('log-content');

const logMessages = [
    "Initializing global search protocols...",
    "Connecting to satellite network...",
    "Scanning North America... [NEGATIVE]",
    "Scanning South America... [NEGATIVE]",
    "Scanning Europe... [NEGATIVE]",
    "Scanning Africa... [NEGATIVE]",
    "Scanning Asia... [SIGNAL DETECTED]",
    "Getting traces from India...",
    "Narrowing search parameters...",
    "Analyzing biometric density...",
    "High concentration of beauty detected in Tamil Nadu...",
    "Triangulating coordinates...",
    "Narrowing to Trichy region...",
    "WARNING: OFF THE CHARTS READINGS DETECTED",
    "Locking on target...",
    "Verifying angel status...",
    "Match confirmed: 100%"
];

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    startBtn.querySelector('.btn-text').textContent = "SCANNING...";

    let delay = 0;

    logMessages.forEach((msg, index) => {
        // Slower: Random delay between 1000ms and 1800ms to let animations breathe
        const stepDelay = Math.random() * 800 + 1000;
        delay += stepDelay;

        setTimeout(() => {
            addLog(msg);

            // Map Interactions based on log content
            const map = document.querySelector('.world-map');

            if (msg.includes("North America")) showStamp('stamp-na');
            if (msg.includes("South America")) showStamp('stamp-sa');
            if (msg.includes("Europe")) showStamp('stamp-eu');
            if (msg.includes("Africa")) showStamp('stamp-af');

            if (msg.includes("Asia")) {
                showStamp('stamp-as');
            }

            if (msg.includes("India")) {
                map.classList.add('zoom-india');
                hideStamps();
            }
            if (msg.includes("Trichy")) {
                map.classList.add('zoom-trichy');
                // Drop the pin
                setTimeout(() => {
                    document.getElementById('map-pin').classList.add('visible');
                }, 500); // Slight delay so map zooms first
            }

            // Scroll to bottom
            const terminal = document.querySelector('.log-terminal');
            terminal.scrollTop = terminal.scrollHeight;

            // If last message, trigger reveal
            if (index === logMessages.length - 1) {
                setTimeout(revealResult, 1000);
            }
        }, delay);
    });
});

function showStamp(id) {
    const stamp = document.getElementById(id);
    if (stamp) stamp.classList.add('visible');
}

function hideStamps() {
    const stamps = document.querySelectorAll('.stamp');
    stamps.forEach(stamp => {
        // Keep the "Signal Detected" stamp visible if desired, or hide all. 
        // User said "remove the not found stamps", but keeping Signal Detected might be nice? 
        // "remove the not found stamps" implies specifically the negative ones.
        // Let's hide the negative ones specifically to be safe, or all for ultra clean.
        // "it would look clean" -> probably hide all except maybe the target?
        // Let's hide all for the zoom effect as the map scales up massively.
        stamp.classList.remove('visible');
    });
}

function addLog(text) {
    const entry = document.createElement('span');
    entry.className = 'log-entry';
    entry.textContent = `> ${text}`;
    logContent.appendChild(entry);
}

function revealResult() {
    scannerSection.style.display = 'none';
    resultSection.classList.remove('hidden');

    // Trigger the "True Beauty" reveal animation
    setTimeout(() => {
        const img = document.getElementById('result-image');
        img.classList.add('enhanced');
        createHeartExplosion();
    }, 500);
}

function createHeartExplosion() {
    const imageFrame = document.querySelector('.image-frame');
    // Ensure frame is relative so hearts position correctly
    imageFrame.style.position = 'relative';
    imageFrame.style.overflow = 'visible'; // Allow hearts to fly out slightly

    // INCREASED HEARTS: 150 hearts for a massive explosion
    for (let i = 0; i < 150; i++) {
        const heart = document.createElement('img');
        heart.src = 'heart.png';
        heart.classList.add('floating-heart');

        // Start at center
        heart.style.left = '50%';
        heart.style.top = '50%';

        // Random angle and distance for "flower/firework" burst
        const angle = Math.random() * 360;
        const distance = Math.random() * 150 + 50; // 50px to 200px outward

        // Calculate exact end positions (trigonometry)
        // Convert degrees to radians: angle * (Math.PI / 180)
        const rad = angle * (Math.PI / 180);
        const tx = Math.cos(rad) * distance;
        const ty = Math.sin(rad) * distance;

        // Set CSS variables for the animation to use
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);

        const animationDuration = Math.random() * 1.5 + 1; // 1-2.5s
        heart.style.animationDuration = `${animationDuration}s`;

        imageFrame.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000);
    }
}
