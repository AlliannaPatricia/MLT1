(() => {
  const canvas = document.getElementById('sakura-trail-canvas');
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

  class TrailPetal {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = 15 + Math.random() * 10;
      this.opacity = 1;
      this.fadeSpeed = 0.02 + Math.random() * 0.02;
      this.angle = Math.random() * 2 * Math.PI;
      this.angularSpeed = (Math.random() - 0.5) * 0.1;
      this.speedY = 0.5 + Math.random() * 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
    }

    update() {
      this.opacity -= this.fadeSpeed;
      this.x += this.speedX;
      this.y += this.speedY;
      this.angle += this.angularSpeed;
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

  function addPetal(x, y) {
    petals.push(new TrailPetal(x, y));
    if (petals.length > 100) petals.shift(); // Limit petals count to avoid lag
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach((petal, index) => {
      petal.update();
      if (petal.opacity <= 0) petals.splice(index, 1);
      else petal.draw();
    });
    requestAnimationFrame(animate);
  }

  petalImg.onload = () => {
    animate();
  };

  // Add petals on mouse move and click
  window.addEventListener('mousemove', e => addPetal(e.clientX, e.clientY));
  window.addEventListener('click', e => addPetal(e.clientX, e.clientY));

  // Add petals on scroll (using scroll position to add random petals)
  window.addEventListener('scroll', () => {
    // Get random position on screen width, fixed y near viewport bottom for trailing effect
    const x = Math.random() * window.innerWidth;
    const y = window.innerHeight - 10;
    addPetal(x, y);
  });

})();
