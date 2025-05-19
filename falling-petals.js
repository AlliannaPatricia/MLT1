// Select the canvas and get 2D context
const canvas = document.getElementById('falling-petals-canvas');
const ctx = canvas.getContext('2d');

// Array to hold petals
const petals = [];
const petalCount = 50; // Number of petals on screen

// Petal image or shape
const petalImage = new Image();
petalImage.src = 'assets/sakura-petal.png'; // Replace with your sakura petal image path

// Resize canvas to full screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Petal constructor
class Petal {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 10 + Math.random() * 15; // size between 10-25 px
    this.speedY = 1 + Math.random() * 2;  // falling speed
    this.speedX = 0.5 - Math.random();    // slight horizontal drift
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 2; // rotation speed
  }

  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;

    // Reset when it falls below the screen
    if (this.y > canvas.height) {
      this.y = -this.size;
      this.x = Math.random() * canvas.width;
    }

    // Wrap around horizontally
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    if (petalImage.complete) {
      ctx.drawImage(petalImage, -this.size/2, -this.size/2, this.size, this.size);
    } else {
      // fallback: draw simple pink circle if image not loaded yet
      ctx.fillStyle = '#f8c1d6';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size/2, this.size/3, 0, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }
}

// Initialize petals
function initPetals() {
  petals.length = 0; // clear if any
  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }
}
initPetals();

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  petals.forEach(petal => {
    petal.update();
    petal.draw();
  });

  requestAnimationFrame(animate);
}

animate();
