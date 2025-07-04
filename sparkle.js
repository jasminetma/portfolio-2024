const canvas = document.getElementById("sparkle-canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

let sparkles = [];

function createSparkle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    opacity: Math.random(),
    opacityDirection: Math.random() < 0.5 ? 1 : -1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5
  };
}

function initSparkles() {
  sparkles = [];
  for (let i = 0; i < 150; i++) {
    sparkles.push(createSparkle());
  }
}

initSparkles();

function drawSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparkles.forEach(sparkle => {
    if (sparkle.opacityDirection === 1) {
      sparkle.opacity += 0.01;
      if (sparkle.opacity >= 1) {
        sparkle.opacityDirection = -1;
      }
    } else {
      sparkle.opacity -= 0.01;
      if (sparkle.opacity <= 0) {
        sparkle.opacityDirection = 1;
      }
    }

    ctx.beginPath();
    ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${sparkle.opacity})`;
    ctx.fill();
  });
}

function updateSparkles() {
  sparkles.forEach(sparkle => {
    sparkle.x += sparkle.speedX;
    sparkle.y += sparkle.speedY;

    // Wrap around edges instead of resetting to random position
    if (sparkle.x < 0) sparkle.x = canvas.width;
    if (sparkle.x > canvas.width) sparkle.x = 0;
    if (sparkle.y < 0) sparkle.y = canvas.height;
    if (sparkle.y > canvas.height) sparkle.y = 0;
  });
}

function animate() {
  drawSparkles();
  updateSparkles();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  initSparkles(); // Reinitialize sparkles with new canvas dimensions
});