/* --------------------------------------------------------------
DocuStream PRO — HEATMAP
D3 · 7 días x 24h · Leyenda · Colores PRO
-------------------------------------------------------------- */

console.log("Heatmap PRO loaded");

function initHeatmap() {
    const el = document.getElementById("heatmapContainer");
    if (!el) return;

    el.innerHTML = "";

    const days = ["L", "M", "X", "J", "V", "S", "D"];

    const data = Array.from({ length: 7 }, (_, row) =>
        Array.from({ length: 24 }, (_, col) => ({
            day: days[row],
            hour: col,
            value: Math.random()
        }))
    ).flat();

    const width = el.clientWidth || 600;
    const height = 220;
    const margin = { top: 20, right: 20, bottom: 30, left: 30 };

    const cellW = (width - margin.left - margin.right) / 24;
    const cellH = (height - margin.top - margin.bottom) / 7;

    const svg = d3.select("#heatmapContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const color = d3.scaleSequential(d3.interpolateTurbo).domain([0, 1]);

    g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => d.hour * cellW)
        .attr("y", (d, i) => Math.floor(i / 24) * cellH)
        .attr("width", cellW - 1)
        .attr("height", cellH - 1)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", d => color(d.value));

    const x = d3.scaleLinear().domain([0, 23]).range([0, 24 * cellW]);
    const y = d3.scaleBand().domain(days).range([0, 7 * cellH]);

    g.append("g")
        .attr("transform", `translate(0,${7 * cellH})`)
        .call(d3.axisBottom(x).ticks(6).tickFormat(d => `${d}h`))
        .attr("color", "#777")
        .selectAll("text")
        .style("font-size", "0.7rem");

    g.append("g")
        .call(d3.axisLeft(y))
        .attr("color", "#777")
        .selectAll("text")
        .style("font-size", "0.7rem");

    // Leyenda simple
    const legendWidth = 120;
    const legendHeight = 8;

    const legend = svg.append("g")
        .attr("transform", `translate(${width - legendWidth - 20},${margin.top})`);

    const legendScale = d3.scaleLinear().domain([0, 1]).range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
        .ticks(3)
        .tickFormat(d => `${Math.round(d * 100)}%`);

    const legendGradientId = "heatmapGradient";

    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
        .attr("id", legendGradientId)
        .attr("x1", "0%")
        .attr("x2", "100%")
        .attr("y1", "0%")
        .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", color(0));
    gradient.append("stop").attr("offset", "100%").attr("stop-color", color(1));

    legend.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("fill", `url(#${legendGradientId})`)
        .attr("rx", 4)
        .attr("ry", 4);

    legend.append("g")
        .attr("transform", `translate(0,${legendHeight + 4})`)
        .call(legendAxis)
        .attr("color", "#777")
        .selectAll("text")
        .style("font-size", "0.65rem");
}

function updateHeatmap(state) {
    console.log("Actualizando heatmap con filtros:", state);
    initHeatmap();
}

window.initHeatmap = initHeatmap;
window.updateHeatmap = updateHeatmap;

