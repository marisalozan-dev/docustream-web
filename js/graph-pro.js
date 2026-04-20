// --- GRAFO PRO ---

const svg = d3.select("#graphCanvas");
const width = +svg.attr("width");
const height = +svg.attr("height");

const tooltip = document.getElementById("graphTooltip");

// Datos de ejemplo (puedes sustituirlos por reales)
const nodes = [
  { id: "DocuStream", type: "core" },
  { id: "API", type: "api" },
  { id: "Normativa", type: "law" },
  { id: "Proceso A", type: "process" },
  { id: "Proceso B", type: "process" },
  { id: "Documento X", type: "doc" },
  { id: "Documento Y", type: "doc" }
];

const links = [
  { source: "DocuStream", target: "API" },
  { source: "DocuStream", target: "Normativa" },
  { source: "DocuStream", target: "Proceso A" },
  { source: "DocuStream", target: "Proceso B" },
  { source: "Proceso A", target: "Documento X" },
  { source: "Proceso B", target: "Documento Y" }
];

// Colores PRO
const colorMap = {
  core: "#534AB7",
  api: "#0F6E56",
  law: "#D85A30",
  process: "#F1C40F",
  doc: "#3498DB"
};

// Simulación física
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id).distance(140))
  .force("charge", d3.forceManyBody().strength(-350))
  .force("center", d3.forceCenter(width / 2, height / 2));

// Enlaces
const link = svg.append("g")
  .attr("stroke", "#999")
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("class", "link");

// Nodos
const node = svg.append("g")
  .selectAll("circle")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("class", "node")
  .attr("r", 18)
  .attr("fill", d => colorMap[d.type])
  .attr("stroke", "#fff")
  .attr("stroke-width", 2)
  .call(drag(simulation))
  .on("mouseover", (event, d) => {
    tooltip.textContent = d.id;
    tooltip.style.opacity = 1;
  })
  .on("mousemove", (event) => {
    tooltip.style.left = event.pageX + 12 + "px";
    tooltip.style.top = event.pageY + 12 + "px";
  })
  .on("mouseout", () => {
    tooltip.style.opacity = 0;
  });

// Actualización en cada tick
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
});

// Función de arrastre
function drag(simulation) {
  return d3.drag()
    .on("start", (event, d) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    })
    .on("drag", (event, d) => {
      d.fx = event.x;
      d.fy = event.y;
    })
    .on("end", (event, d) => {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    });
}




