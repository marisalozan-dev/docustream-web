/* --------------------------------------------------------------
GRAFO AVANZADO PRO — D3 + Animación
-------------------------------------------------------------- */

console.log("Graph Advanced PRO loaded");

/* --------------------------------------------------------------
DATOS DE EJEMPLO
-------------------------------------------------------------- */

const GRAPH_NODES = [
    { id: "Documento A" },
    { id: "Documento B" },
    { id: "Documento C" },
    { id: "Documento D" }
];

const GRAPH_LINKS = [
    { source: "Documento A", target: "Documento B" },
    { source: "Documento A", target: "Documento C" },
    { source: "Documento B", target: "Documento D" }
];

/* --------------------------------------------------------------
INICIALIZACIÓN
-------------------------------------------------------------- */

function initGraphAdvanced() {
    console.log("Inicializando Grafo Avanzado PRO…");
    renderGraph();
}

/* --------------------------------------------------------------
RENDER DEL GRAFO
-------------------------------------------------------------- */

function renderGraph() {
    const container = document.getElementById("graphAdvancedContainer");
    if (!container) return;

    container.innerHTML = "";

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const svg = d3.select("#graphAdvancedContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(GRAPH_NODES)
        .force("link", d3.forceLink(GRAPH_LINKS).id(d => d.id).distance(140))
        .force("charge", d3.forceManyBody().strength(-260))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll("line")
        .data(GRAPH_LINKS)
        .enter()
        .append("line")
        .attr("stroke", "rgba(0, 229, 160, 0.35)")
        .attr("stroke-width", 2);

    const node = svg.selectAll("circle")
        .data(GRAPH_NODES)
        .enter()
        .append("circle")
        .attr("r", 12)
        .attr("fill", "#00e5a0")
        .style("filter", "drop-shadow(0 0 6px #00e5a0)");

    const labels = svg.selectAll("text")
        .data(GRAPH_NODES)
        .enter()
        .append("text")
        .text(d => d.id)
        .attr("fill", "#fff")
        .attr("font-size", "0.8rem");

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        labels
            .attr("x", d => d.x + 14)
            .attr("y", d => d.y + 4);
    });

    animateGraph();
}

/* --------------------------------------------------------------
ANIMACIÓN DE ENTRADA DEL GRAFO
-------------------------------------------------------------- */

function animateGraph() {
    const graph = document.getElementById("graphAdvancedContainer");
    if (!graph) return;

    gsap.from(graph, {
        opacity: 0,
        scale: 0.96,
        duration: 0.45,
        ease: "power2.out"
    });
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initGraphAdvanced = initGraphAdvanced;
