<script>
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();

const letters = "01";
const fontSize = 14;
let columns = canvas.width / fontSize;
let drops = [];

function initDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
  }
}

initDrops();

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#62ff8a";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener("resize", () => {
  resizeCanvas();
  initDrops();
});
</script>
