/* --------------------------------------------------------------
HEATMAP PRO — Placeholder visual
-------------------------------------------------------------- */

console.log("Heatmap PRO loaded");

/* --------------------------------------------------------------
RENDER DEL HEATMAP (SIMPLIFICADO PERO VISUAL)
-------------------------------------------------------------- */

function updateHeatmap() {
    const container = document.getElementById("heatmapContainer");
    if (!container) return;

    container.innerHTML = `
        <div style="
            width: 100%;
            height: 220px;
            margin-top: 24px;
            border-radius: 16px;
            background: radial-gradient(circle at 10% 20%, #00e5a0 0, #003 40%),
                        radial-gradient(circle at 80% 60%, #0af 0, #001 45%);
            border: 1px solid rgba(0, 229, 160, 0.25);
        "></div>
    `;
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.updateHeatmap = updateHeatmap;

