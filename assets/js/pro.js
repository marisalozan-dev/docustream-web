/* ---------------------------------------------------------
   ELEMENTOS
--------------------------------------------------------- */

const root = document.documentElement;
const logo = document.getElementById("logo");
const themeToggle = document.getElementById("themeToggle");
const configThemeToggle = document.getElementById("configThemeToggle");
const menuItems = document.querySelectorAll(".menu-item");
const panels = document.querySelectorAll(".panel");

/* ---------------------------------------------------------
   FUNCIÓN: APLICAR TEMA
--------------------------------------------------------- */

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
        logo.src = "assets/images/logo-dark.svg";
        if (themeToggle) themeToggle.textContent = "☀️";
    } else {
        logo.src = "assets/images/logo-light.svg";
        if (themeToggle) themeToggle.textContent = "🌙";
    }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        applyTheme(current === "light" ? "dark" : "light");
    });
}

if (configThemeToggle) {
    configThemeToggle.addEventListener("click", () => {
        const current = root.getAttribute("data-theme");
        applyTheme(current === "light" ? "dark" : "light");
    });
}

/* ---------------------------------------------------------
   NAVEGACIÓN ENTRE PANELES
--------------------------------------------------------- */

menuItems.forEach(item => {
    item.addEventListener("click", () => {
        const target = item.getAttribute("data-panel");

        menuItems.forEach(btn => btn.classList.remove("active"));
        item.classList.add("active");

        panels.forEach(panel => {
            panel.classList.remove("active");
            if (panel.id === target) panel.classList.add("active");
        });
    });
});

/* ---------------------------------------------------------
   DASHBOARD — CHART.JS
--------------------------------------------------------- */

const ctx = document.getElementById("chartDocs");

if (ctx) {
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
            datasets: [{
                label: "Documentos procesados",
                data: [12, 19, 25, 32, 41],
                borderColor: "#00D8A0",
                backgroundColor: "rgba(0, 216, 160, 0.2)",
                borderWidth: 3,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });
}

/* ---------------------------------------------------------
   GRAFO SEMÁNTICO
--------------------------------------------------------- */

const graphCanvas = document.getElementById("graphCanvas");

if (graphCanvas) {
    const gctx = graphCanvas.getContext("2d");

    graphCanvas.width = graphCanvas.offsetWidth;
    graphCanvas.height = graphCanvas.offsetHeight;

    const nodes = [
        { x: 200, y: 150, r: 12 },
        { x: 400, y: 100, r: 10 },
        { x: 350, y: 250, r: 10 },
        { x: 150, y: 260, r: 10 },
        { x: 500, y: 200, r: 10 }
    ];

    function drawGraph() {
        gctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

        gctx.strokeStyle = getComputedStyle(root).getPropertyValue("--accent");
        gctx.fillStyle = getComputedStyle(root).getPropertyValue("--accent");

        gctx.lineWidth = 3;
        nodes.forEach((n1, i) => {
            nodes.forEach((n2, j) => {
                if (i < j) {
                    gctx.beginPath();
                    gctx.moveTo(n1.x, n1.y);
                    gctx.lineTo(n2.x, n2.y);
                    gctx.stroke();
                }
            });
        });

        nodes.forEach(n => {
            gctx.beginPath();
            gctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            gctx.fill();
        });

        requestAnimationFrame(drawGraph);
    }

    drawGraph();
}

/* ---------------------------------------------------------
   HEATMAP
--------------------------------------------------------- */

const heatmapCanvas = document.getElementById("heatmapCanvas");

if (heatmapCanvas) {
    const hctx = heatmapCanvas.getContext("2d");

    heatmapCanvas.width = heatmapCanvas.offsetWidth;
    heatmapCanvas.height = heatmapCanvas.offsetHeight;

    function drawHeatmap() {
        const rows = 6;
        const cols = 10;
        const cellW = heatmapCanvas.width / cols;
        const cellH = heatmapCanvas.height / rows;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const intensity = Math.random();
                const color = `rgba(0, 216, 160, ${intensity})`;

                hctx.fillStyle = color;
                hctx.fillRect(c * cellW, r * cellH, cellW, cellH);
            }
        }
    }

    setInterval(drawHeatmap, 800);
}
menuItems.forEach(item => {
    item.addEventListener("click", () => {
        setTimeout(() => {
            if (graphCanvas) {
                graphCanvas.width = graphCanvas.offsetWidth;
                graphCanvas.height = graphCanvas.offsetHeight;
            }
            if (heatmapCanvas) {
                heatmapCanvas.width = heatmapCanvas.offsetWidth;
                heatmapCanvas.height = heatmapCanvas.offsetHeight;
            }
        }, 200);
    });
});


