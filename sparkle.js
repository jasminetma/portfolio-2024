
const canvas = document.getElementById("sparkle-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let sparkles = [];

function createSparkle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    opacity: Math.random(), // Initial opacity
    opacityDirection: Math.random() < 0.5 ? 1 : -1, // Random direction for opacity change (fading in or out)
    speedX: Math.random() * 0.5 - 0.25,
    speedY: Math.random() * 0.5 - 0.25
  };
}

for (let i = 0; i < 150; i++) {
  sparkles.push(createSparkle());
}

function drawSparkles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparkles.forEach(sparkle => {
    // Smoothly fade in and out
    if (sparkle.opacityDirection === 1) {
      sparkle.opacity += 0.01; // Fade in
      if (sparkle.opacity >= 1) {
        sparkle.opacityDirection = -1; // Reverse direction when fully visible
      }
    } else {
      sparkle.opacity -= 0.01; // Fade out
      if (sparkle.opacity <= 0) {
        sparkle.opacityDirection = 1; // Reverse direction when fully transparent
      }
    }

    // Draw the sparkle with the current opacity
    ctx.beginPath();
    ctx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${sparkle.opacity})`;
    ctx.fill();
  });
}

function updateSparkles() {
  sparkles.forEach(sparkle => {
    // Sparkles move slowly around the screen (like fireflies)
    sparkle.x += sparkle.speedX;
    sparkle.y += sparkle.speedY;

    // Reset position if the sparkle goes out of bounds
    if (sparkle.x < 0 || sparkle.x > canvas.width || sparkle.y < 0 || sparkle.y > canvas.height) {
      sparkle.x = Math.random() * canvas.width;
      sparkle.y = Math.random() * canvas.height;
    }
  });
}

function animate() {
  drawSparkles();
  updateSparkles();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
