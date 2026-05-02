/* ============================================================
   DONUT DE CALIDAD — FlowSync Technologies
   ============================================================ */

const donutData = [
    { label: "Consistente", value: 62, color: "#7ED7A1" },
    { label: "Revisión", value: 21, color: "#A7E8FF" },
    { label: "Anomalías", value: 9, color: "#FFF4B8" },
    { label: "Obsoleta", value: 8, color: "#FFB8A8" }
];

function renderQualityDonut() {
    const container = d3.select("#qualityDonut");
    container.selectAll("*").remove();

    const width = 260;
    const height = 260;
    const radius = Math.min(width, height) / 2;

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(70).outerRadius(radius);

    svg.selectAll("path")
        .data(pie(donutData))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", d => d.data.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .attr("font-size", "1.4rem")
        .attr("fill", "#4A4A4A")
        .text("89%");
}

renderQualityDonut();
