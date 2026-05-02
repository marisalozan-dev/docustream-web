/* ============================================================
   HEATMAP — Actividad de actualización de documentación
   FlowSync Technologies — Fresh Knowledge Edition
   ============================================================ */

const heatmapData = [
    // day: 0 = Lunes ... 6 = Domingo
    { day: 0, hour: 9,  value: 3 },
    { day: 0, hour: 10, value: 5 },
    { day: 0, hour: 11, value: 7 },
    { day: 0, hour: 15, value: 4 },

    { day: 1, hour: 10, value: 6 },
    { day: 1, hour: 11, value: 8 },
    { day: 1, hour: 16, value: 5 },

    { day: 2, hour: 9,  value: 2 },
    { day: 2, hour: 14, value: 7 },
    { day: 2, hour: 17, value: 6 },

    { day: 3, hour: 10, value: 9 },
    { day: 3, hour: 11, value: 10 },
    { day: 3, hour: 15, value: 7 },

    { day: 4, hour: 9,  value: 4 },
    { day: 4, hour: 13, value: 6 },
    { day: 4, hour: 16, value: 5 }
];

function renderHeatmap() {
    const container = d3.select("#heatmapContainer");
    if (container.empty()) return;

    container.selectAll("*").remove();

    const width = 600;
    const height = 220;
    const cellSize = 24;

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    const days = ["L", "M", "X", "J", "V", "S", "D"];
    const hours = d3.range(8, 19); // 8h a 18h

    /* ===================== ESCALAS ===================== */
    const colorScale = d3.scaleLinear()
        .domain([0, 10])
        .range(["#CFFFE5", "#7ED7A1"]); // Fresh Knowledge

    /* ===================== ETIQUETAS DÍAS ===================== */
    svg.selectAll(".day-label")
        .data(days)
        .enter()
        .append("text")
        .attr("x", 0)
        .attr("y", (d, i) => 30 + i * cellSize)
        .attr("dy", "0.8em")
        .attr("font-size", 10)
        .attr("fill", "#4A4A4A")
        .text(d => d);

    /* ===================== ETIQUETAS HORAS ===================== */
    svg.selectAll(".hour-label")
        .data(hours)
        .enter()
        .append("text")
        .attr("x", (d, i) => 40 + i * cellSize)
        .attr("y", 20)
        .attr("font-size", 9)
        .attr("fill", "#4A4A4A")
        .attr("text-anchor", "middle")
        .text(d => d + "h");

    /* ===================== CELDAS ===================== */
    svg.selectAll(".cell")
        .data(heatmapData)
        .enter()
        .append("rect")
        .attr("class", "heatmap-cell")
        .attr("x", d => 40 + (d.hour - 8) * cellSize)
        .attr("y", d => 30 + d.day * cellSize)
        .attr("width", cellSize - 4)
        .attr("height", cellSize - 4)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", d => colorScale(d.value))
        .on("mouseover", function (event, d) {
            tooltip.style("opacity", 1)
                .html(`${days[d.day]} ${d.hour}:00<br><strong>${d.value} actualizaciones</strong>`);
        })
        .on("mousemove", function (event) {
            tooltip.style("left", (event.pageX + 12) + "px")
                   .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            tooltip.style("opacity", 0);
        });

    /* ===================== TOOLTIP ===================== */
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "heatmap-tooltip");
}

renderHeatmap();



