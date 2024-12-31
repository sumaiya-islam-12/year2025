const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, colors) {
    this.x = x;
    this.y = y;
    this.sparks = [];
    this.colors = colors;

    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = Math.random() * 4 + 2;
      this.sparks.push(new Spark(this.x, this.y, angle, speed, this.colors));
    }
  }

  update() {
    this.sparks.forEach((spark) => spark.update());
  }

  draw() {
    this.sparks.forEach((spark) => spark.draw());
  }

  isFinished() {
    return this.sparks.every((spark) => spark.opacity <= 0);
  }
}

class Spark {
  constructor(x, y, angle, speed, colors) {
    this.x = x;
    this.y = y;
    this.speedX = Math.cos(angle) * speed;
    this.speedY = Math.sin(angle) * speed;
    this.gravity = 0.02;
    this.opacity = 1;
    this.size = Math.random() * 3 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.opacity -= 0.02;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = rgba(${this.color}, ${this.opacity});
    ctx.fill();
  }
}

const fireworks = [];
const colors = ['255, 99, 71', '54, 162, 235', '255, 206, 86', '75, 192, 192', '153, 102, 255'];

function launchFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  fireworks.push(new Firework(x, y, colors));
}

function animate() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();

    if (firework.isFinished()) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

setInterval(launchFirework, 800);
animate();