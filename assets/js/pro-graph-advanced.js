/* --------------------------------------------------------------
GRAFO AVANZADO PRO — D3 Interactivo (Zoom + Pan + Drag)
-------------------------------------------------------------- */

console.log("Graph Advanced PRO — Interactivo loaded");

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
    console.log("Inicializando Grafo Avanzado PRO Interactivo…");
    renderGraphInteractive();
}

/* --------------------------------------------------------------
RENDER INTERACTIVO
-------------------------------------------------------------- */

function renderGraphInteractive() {
    const container = document.getElementById("graphAdvancedContainer");
    if (!container) return;

    container.innerHTML = "";

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    /* ---------------------- ZOOM + PAN ---------------------- */
    const zoom = d3.zoom()
        .scaleExtent([0.4, 2.5])
        .on("zoom", (event) => {
            svgGroup.attr("transform", event.transform);
        });

    const svg = d3.select("#graphAdvancedContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    const svgGroup = svg.append("g");

    /* ---------------------- SIMULACIÓN ---------------------- */
    const simulation = d3.forceSimulation(GRAPH_NODES)
        .force("link", d3.forceLink(GRAPH_LINKS).id(d => d.id).distance(140))
        .force("charge", d3.forceManyBody().strength(-320))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(40));

    /* ---------------------- ENLACES ---------------------- */
    const link = svgGroup.selectAll("line")
        .data(GRAPH_LINKS)
        .enter()
        .append("line")
        .attr("stroke", "rgba(0, 229, 160, 0.35)")
        .attr("stroke-width", 2);

    /* ---------------------- DRAG ---------------------- */
    const drag = d3.drag()
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

    /* ---------------------- NODOS ---------------------- */
    const node = svgGroup.selectAll("circle")
        .data(GRAPH_NODES)
        .enter()
        .append("circle")
        .attr("r", 14)
        .attr("fill", "#00e5a0")
        .style("filter", "drop-shadow(0 0 6px #00e5a0)")
        .call(drag);

    /* ---------------------- ETIQUETAS ---------------------- */
    const labels = svgGroup.selectAll("text")
        .data(GRAPH_NODES)
        .enter()
        .append("text")
        .text(d => d.id)
        .attr("fill", "#fff")
        .attr("font-size", "0.85rem")
        .attr("font-weight", "500");

    /* ---------------------- TICK ---------------------- */
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
            .attr("x", d => d.x + 16)
            .attr("y", d => d.y + 4);
    });

    animateGraph();
}

/* --------------------------------------------------------------
ANIMACIÓN DE ENTRADA (PRO)
-------------------------------------------------------------- */

function animateGraph() {
    const graph = document.getElementById("graphAdvancedContainer");
    if (!graph) return;

    gsap.fromTo(graph,
        { opacity: 0.6, scale: 0.98 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out"
        }
    );
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initGraphAdvanced = initGraphAdvanced;



