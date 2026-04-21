console.log("DocuStream PRO loaded");

const canvas = document.getElementById("proCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let nodes = [];

function randomNodes() {
    nodes = [];
    for (let i = 0; i < 20; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: 6 + Math.random() * 6,
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5
        });
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "#00c896";
        ctx.fill();
    });

    nodes.forEach(a => {
        nodes.forEach(b => {
            const dist = Math.hypot(a.x - b.x, a.y - b.y);
            if (dist < 150) {
                ctx.strokeStyle = "rgba(0,200,150,0.2)";
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            }
        });
    });

    nodes.forEach(n => {
        n.x += n.dx;
        n.y += n.dy;

        if (n.x < 0 || n.x > canvas.width) n.dx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.dy *= -1;
    });

    requestAnimationFrame(draw);
}

document.getElementById("resetBtn").addEventListener("click", () => {
    randomNodes();
});

document.getElementById("randomBtn").addEventListener("click", () => {
    randomNodes();
});

document.getElementById("darkBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

randomNodes();
draw();



