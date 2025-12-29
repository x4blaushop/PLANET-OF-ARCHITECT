const canvas = document.getElementById("portalCanvas");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const dnaChars = "X4DNA77701PATRICK".split("");

function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    // Densidade extrema para efeito de "milhares de letras"
    for(let i = 0; i < 1200; i++) { 
        particles.push({
            r: Math.random() * Math.max(w, h),
            angle: Math.random() * Math.PI * 2,
            speed: 0.004, // Velocidade 20%
            size: Math.random() * 13 + 9,
            c: dnaChars[Math.floor(Math.random() * dnaChars.length)]
        });
    }
}

function draw() {
    // Acúmulo de rastro cria a "massa" orgânica da imagem
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, w, h);

    particles.forEach(p => {
        p.angle += p.speed;
        p.r -= 2.4; // Sucção para o buraco negro

        if(p.r < 40) p.r = Math.max(w, h) * 0.85;

        const x = w/2 + Math.cos(p.angle) * p.r;
        const y = h/2 + Math.sin(p.angle) * p.r;

        // Renderização Glow Neon Azul
        ctx.fillStyle = "#00f2ff";
        ctx.font = p.size + "px monospace";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00f2ff";
        ctx.fillText(p.c, x, y);

        // Cintilação aleatória em branco
        if(Math.random() > 0.99) {
            ctx.fillStyle = "#fff";
            ctx.fillText(p.c, x, y);
        }
    });

    // O Centro do Horizonte de Eventos
    ctx.beginPath();
    ctx.arc(w/2, h/2, 60, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.shadowBlur = 70;
    ctx.shadowColor = "#00f2ff";
    ctx.stroke();

    requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
