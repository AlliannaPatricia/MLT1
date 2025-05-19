// Sakura mouse trail effect

const canvas = document.getElementById('sakura-canvas');
const ctx = canvas.getContext('2d');

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const petals = [];

class Petal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = Math.random() * -1 - 1;
    this.opacity = 1;
    this.angle = Math.random() * 2 * Math.PI;
    this.spin = (Math.random() - 0.5) * 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.spin;
    this.opacity -= 0.02;
    if (this.opacity < 0) this.opacity = 0;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = `rgba(214, 102, 143, ${this.opacity})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }
}

window.addEventListener('mousemove', e => {
  for (let i = 0; i < 3; i++) {
    petals.push(new Petal(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20));
  }
});

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = petals.length - 1; i >= 0; i--) {
    let p = petals[i];
    p.update();
    p.draw();

    if (p.opacity <= 0) petals.splice(i, 1);
  }

  requestAnimationFrame(animate);
}

animate();
