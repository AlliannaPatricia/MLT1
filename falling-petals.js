(() => {
  const canvas = document.getElementById('falling-petals-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let petals = [];

  const petalImg = new Image();
  petalImg.src = 'assets/sakura-petal.png';

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height - height; // Start above canvas
      this.size = 20 + Math.random() * 20;
      this.speedY = 1 + Math.random() * 2;
      this.speedX = (Math.random() - 0.5) * 1;
      this.angle = Math.random() * 2 * Math.PI;
      this.angularSpeed = (Math.random() - 0.5) * 0.02;
      this.opacity = 0.5 + Math.random() * 0.5;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.angle += this.angularSpeed;

      if (this.y > height + this.size) {
        this.reset();
        this.y = -this.size;
      }

      if (this.x > width + this.size) this.x = -this.size;
      if (this.x < -this.size) this.x = width + this.size;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(petalImg, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
    }
  }

  function initPetals() {
    petals = [];
    const petalCount = 40;
    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(petal => {
      petal.update();
      petal.draw();
    });
    requestAnimationFrame(animate);
  }

  petalImg.onload = () => {
    initPetals();
    animate();
  };
})();
