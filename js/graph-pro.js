/* -------------------------------------------------------
   DocuStream PRO — GRAPH MODULE
   Grafo semántico interactivo con D3.js
------------------------------------------------------- */

console.log("Graph PRO loaded");

let graphSvg = null;
let simulation = null;


/* -------------------------------------------------------
   INICIALIZACIÓN
------------------------------------------------------- */

function initGraph() {
    const container = document.getElementById("graphContainer");

    // Limpiar si ya existe
    container.innerHTML = "";

    const width = container.clientWidth;
    const height = container.clientHeight || 360;

    // Crear SVG
    graphSvg = d3.select("#graphContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Crear grafo inicial
    const graphData = generateGraphData(PRO_STATE);
    renderGraph(graphData, width, height);
}


/* -------------------------------------------------------
   ACTUALIZACIÓN POR FILTROS
------------------------------------------------------- */

function updateGraph(state) {
    const container = document.getElementById("graphContainer");
    const width = container.clientWidth;
    const height = container.clientHeight;

    const newData = generateGraphData(state);

    // Limpiar SVG
    graphSvg.selectAll("*").remove();

    // Renderizar de nuevo
    renderGraph(newData, width, height);

    // Microanimación
    gsap.from("#graphContainer svg", { opacity: 0, duration: 0.4 });
}


/* -------------------------------------------------------
   GENERADOR DE DATOS DEL GRAFO
------------------------------------------------------- */

function generateGraphData(state) {
    const nodeCount = {
        all: 18,
        api: 14,
        spec: 16,
        manual: 12,
        incident: 10
    };

    const count = nodeCount[state.docType] || 14;

    const nodes = [];
    const links = [];

    for (let i = 0; i < count; i++) {
        nodes.push({
            id: "N" + i,
            group: randomInt(1, 4)
        });
    }

    // Crear relaciones aleatorias
    for (let i = 0; i < count * 1.5; i++) {
        links.push({
            source: "N" + randomInt(0, count - 1),
            target: "N" + randomInt(0, count - 1),
            strength: Math.random() * 0.8 + 0.2
        });
    }

    return { nodes, links };
}


/* -------------------------------------------------------
   RENDERIZAR GRAFO
------------------------------------------------------- */

function renderGraph(data, width, height) {

    simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links)
            .id(d => d.id)
            .distance(80)
            .strength(d => d.strength))
        .force("charge", d3.forceManyBody().strength(-180))
        .force("center", d3.forceCenter(width / 2, height / 2));

    // Líneas (relaciones)
    const link = graphSvg.append("g")
        .attr("stroke", "rgba(0,229,160,0.25)")
        .attr("stroke-width", 1.4)
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line");

    // Nodos
    const node = graphSvg.append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 8)
        .attr("fill", d => {
            const colors = {
                1: "rgba(0,229,160,0.9)",
                2: "rgba(0,229,160,0.6)",
                3: "rgba(0,229,160,0.4)",
                4: "rgba(0,229,160,0.25)"
            };
            return colors[d.group];
        })
        .attr("stroke", "rgba(255,255,255,0.15)")
        .attr("stroke-width", 1.5)
        .call(drag(simulation));

    // Halos mint
    const halo = graphSvg.append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", 18)
        .attr("fill", "rgba(0,229,160,0.08)");

    // Simulación
    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        halo
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });
}


/* -------------------------------------------------------
   DRAG & DROP
------------------------------------------------------- */

function drag(simulation) {
    return d3.drag()
        .on("start", event => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        })
        .on("drag", event => {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        })
        .on("end", event => {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        });
}


/* -------------------------------------------------------
   EXPONER FUNCIONES
------------------------------------------------------- */

window.initGraph = initGraph;
window.updateGraph = updateGraph;

