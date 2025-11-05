const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variabel game
let playerX = 50, playerY = canvas.height / 2;
const playerWidth = 30, playerHeight = 30;
const playerSpeed = 5;

const bullets = [];
const enemies = [];
let score = 0;
let lives = 3;
let isGameOver = false;
let isWinner = false;

// Audio
const shootSound = new Audio('./assets/shoot.wav'); // Suara tembakan
const hitSound = new Audio('./assets/hit.wav'); // Suara hit musuh
const gameOverSound = new Audio('./assets/gameover.wav'); // Suara game over
const winSound = new Audio('./assets/win.wav'); // Suara kemenangan

// Fungsi untuk memastikan audio dapat diputar kembali
function playSound(sound) {
    sound.currentTime = 0; // Reset waktu audio ke awal
    sound.play().catch((err) => {
        console.error('Audio playback failed:', err);
    });
}

// Input handler
let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.code] = true;

    // Tembakan
    if (e.code === 'Space' && !isGameOver && !isWinner) {
        bullets.push({
            x: playerX + playerWidth,
            y: playerY + playerHeight / 2 - 5,
            radius: 5,
            speed: 7,
        });
        playSound(shootSound);
    }

    // Restart game
    if (e.code === 'Enter' && (isGameOver || isWinner)) {
        resetGame();
        playerX = 50;
        playerY = canvas.height / 2;
        lives = 3;
        score = 0;
        isGameOver = false;
        isWinner = false;
    }
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Fungsi reset game
function resetGame() {
    score = 0;
    lives = 3;
    isGameOver = false;
    isWinner = false;
    bullets.length = 0;
    enemies.length = 0;
}

// Fungsi menambahkan musuh secara berkala
function spawnEnemy() {
    if (!isGameOver && !isWinner) {
        enemies.push({
            x: canvas.width,
            y: Math.random() * (canvas.height - 50),
            width: 50,
            height: 50,
            speed: 2 + Math.random() * 2,
        });
    }
}

// Update posisi objek
function update() {
    if (isGameOver || isWinner) return;

    // Gerakan player
    if (keys['ArrowUp'] && playerY > 0) playerY -= playerSpeed;
    if (keys['ArrowDown'] && playerY + playerHeight < canvas.height) playerY += playerSpeed;
    if (keys['ArrowLeft'] && playerX > 0) playerX -= playerSpeed;
    if (keys['ArrowRight'] && playerX + playerWidth < canvas.width) playerX += playerSpeed;

    // Update peluru
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;

        // Hapus peluru jika keluar layar
        if (bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }

        // Cek tabrakan dengan musuh
        enemies.forEach((enemy, enemyIndex) => {
            if (
                bullet.x + bullet.radius > enemy.x &&
                bullet.y > enemy.y &&
                bullet.y < enemy.y + enemy.height
            ) {
                bullets.splice(index, 1);
                enemies.splice(enemyIndex, 1);
                score += 1;
                playSound(hitSound);

                // Cek apakah pemain menang
                if (score >= 10) {
                    isWinner = true;
                    playSound(winSound);
                }
            }
        });
    });

    // Update musuh
    enemies.forEach((enemy, index) => {
        enemy.x -= enemy.speed;

        // Cek tabrakan dengan player
        if (
            enemy.x < playerX + playerWidth &&
            enemy.x + enemy.width > playerX &&
            enemy.y < playerY + playerHeight &&
            enemy.y + enemy.height > playerY
        ) {
            // playSound(hitSound);
        }

        // Hapus musuh jika keluar layar dan kurangi nyawa
        if (enemy.x + enemy.width < 0) {
            lives -= 1;
            enemies.splice(index, 1);
            playSound(hitSound);
            // Game over jika nyawa habis
            if (lives == 0) {
                isGameOver = true;
                playSound(gameOverSound);
            }
        }
    });
}

// Gambar objek
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar player
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(playerX, playerY);
    ctx.lineTo(playerX, playerY + playerHeight);
    ctx.lineTo(playerX + playerWidth, playerY + playerHeight / 2);
    ctx.closePath();
    ctx.fill();

    // Gambar peluru
    ctx.fillStyle = 'red';
    bullets.forEach((bullet) => {
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    // Gambar musuh
    ctx.fillStyle = 'purple';
    enemies.forEach((enemy) => {
        ctx.beginPath();
        const centerX = enemy.x + enemy.width / 2;
        const centerY = enemy.y + enemy.height / 2;
        const radius = enemy.width / 2;

        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    });

    // Gambar skor
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, 30);

    // Gambar nyawa
    ctx.fillText(`Lives: ${lives}`, canvas.width / 2, 60);

    // Gambar Game Over
    if (isGameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '50px Arial';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Press Enter to Restart', canvas.width / 2, canvas.height / 2 + 50);
    }

    // Gambar Winner
    if (isWinner) {
        ctx.fillStyle = 'green';
        ctx.font = '50px Arial';
        ctx.fillText('Winner!', canvas.width / 2, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Press Enter to Play Again', canvas.width / 2, canvas.height / 2 + 50);
    }
}

// Loop utama
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Mulai game
gameLoop();
setInterval(spawnEnemy, 3000); // Tambahkan musuh setiap 3 detik

