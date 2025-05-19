// Falling sakura petals animation

const canvasFalling = document.getElementById('sakura-canvas');
const ctxFalling = canvasFalling.getContext('2d');

const petalsFalling = [];

class FallingPetal {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 10 + 5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = Math.random() * 1 + 0.5;
    this.angle = Math.random() * 2 * Math.PI;
    this.spin = (Math.random() -
