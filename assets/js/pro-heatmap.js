/* --------------------------------------------------------------
DocuStream PRO — HEATMAP REAL CON D3
-------------------------------------------------------------- */

console.log("Heatmap PRO loaded");

function initHeatmap() {
    const el = document.getElementById("heatmapContainer");
    if (!el) return;

    // Datos simulados (7 días x 24 horas)
    const data = Array.from({ length: 7 }, () =>
        Array.from({ length: 24 }, () => Math.random())
    );

    const width = el.clientWidth || 600;
    const height = 200;
    const cellW = width / data[0].length;
    const cellH = height / data.length;

    const svg = d3.select("#heatmapContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const color = d3.scaleSequential(d3.interpolateTurbo).domain([0, 1]);

    svg.selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .each(function (row, rowIndex) {
            d3.select(this)
                .selectAll("rect")
                .data(row)
                .enter()
                .append("rect")
                .attr("x", (_, colIndex) => colIndex * cellW)
                .attr("y", rowIndex * cellH)
                .attr("width", cellW)
                .attr("height", cellH)
                .attr("fill", d => color(d));
        });
}

function updateHeatmap(state) {
    console.log("Actualizando heatmap con filtros:", state);

    // Por ahora solo regeneramos el heatmap
    const el = document.getElementById("heatmapContainer");
    if (!el) return;

    el.innerHTML = "";
    initHeatmap();
}

window.initHeatmap = initHeatmap;
window.updateHeatmap = updateHeatmap;
