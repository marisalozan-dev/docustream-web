/* -------------------------------------------------------
   DocuStream PRO — HEATMAP MODULE
   Mapa de densidad documental con animación
------------------------------------------------------- */

console.log("Heatmap PRO loaded");

let heatmapCanvas = null;
let heatmapCtx = null;


/* -------------------------------------------------------
   INICIALIZACIÓN
------------------------------------------------------- */

function initHeatmap() {
    const container = document.getElementById("heatmapContainer");

    // Limpiar si ya existe
    container.innerHTML = "";

    // Crear canvas
    heatmapCanvas = document.createElement("canvas");
    heatmapCanvas.width = container.clientWidth;
    heatmapCanvas.height = container.clientHeight;

    container.appendChild(heatmapCanvas);

    heatmapCtx = heatmapCanvas.getContext("2d");

    drawHeatmap(generateHeatmapData(PRO_STATE));
}


/* -------------------------------------------------------
   ACTUALIZACIÓN POR FILTROS
------------------------------------------------------- */

function updateHeatmap(state) {
    const data = generateHeatmapData(state);
    drawHeatmap(data);

    gsap.from("#heatmapContainer canvas", {
        opacity: 0,
        duration: 0.4
    });
}


/* -------------------------------------------------------
   GENERADOR DE DATOS
------------------------------------------------------- */

function generateHeatmapData(state) {
    const densityMap = {
        all: 1,
        high: 1.4,
        medium: 1,
        low: 0.6
    };

    const multiplier = densityMap[state.density] || 1;

    const cols = 14;
    const rows = 8;

    const data = [];

    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
            row.push(Math.random() * multiplier);
        }
        data.push(row);
    }

    return data;
}


/* -------------------------------------------------------
   DIBUJAR HEATMAP
------------------------------------------------------- */

function drawHeatmap(data) {
    const width = heatmapCanvas.width;
    const height = heatmapCanvas.height;

    const cols = data[0].length;
    const rows = data.length;

    const cellW = width / cols;
    const cellH = height / rows;

    heatmapCtx.clearRect(0, 0, width, height);

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

            const value = data[y][x];

            // Color mint según intensidad
            const alpha = Math.min(0.8, value * 0.8);

            heatmapCtx.fillStyle = `rgba(0, 229, 160, ${alpha})`;
            heatmapCtx.fillRect(x * cellW, y * cellH, cellW, cellH);
        }
    }

    // Glow suave
    heatmapCtx.fillStyle = "rgba(0, 229, 160, 0.08)";
    heatmapCtx.fillRect(0, 0, width, height);
}


/* -------------------------------------------------------
   EXPONER FUNCIONES
------------------------------------------------------- */

window.initHeatmap = initHeatmap;
window.updateHeatmap = updateHeatmap;
