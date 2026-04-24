/* --------------------------------------------------------------
GRAFO AVANZADO PRO — Analítico + Visual + Interactivo
-------------------------------------------------------------- */

console.log("Graph Advanced PRO — Analítico + Visual loaded");

/* --------------------------------------------------------------
DATOS DE EJEMPLO (puedes sustituirlos por datos reales)
-------------------------------------------------------------- */

const GRAPH_NODES = [
    { id: "Documento A", tipo: "procesado", tamaño: 120, updated: "2026-04-20" },
    { id: "Documento B", tipo: "revision", tamaño: 80, updated: "2026-04-18" },
    { id: "Documento C", tipo: "critico", tamaño: 200, updated: "2026-04-22" },
    { id: "Documento D", tipo: "anomalía", tamaño: 60, updated: "2026-04-19" }
];

const GRAPH_LINKS = [
    { source: "Documento A", target: "Documento B", fuerza: 1 },
    { source: "Documento A", target: "Documento C", fuerza: 2 },
    { source: "Documento B", target: "Documento D", fuerza: 0.5 }
];

/* --------------------------------------------------------------
MAPA DE COLORES POR TIPO
-------------------------------------------------------------- */

const COLOR_MAP = {
    procesado: "#00e5a0",
    revision: "#4da6ff",
    anomalía: "#ffcc00",
    critico: "#ff4d4d"
};

/* --------------------------------------------------------------
INICIALIZACIÓN
-------------------------------------------------------------- */

function initGraphAdvanced() {
    console.log("Inicializando Grafo Avanzado Analítico…");
    renderGraphAnalytic();
}

/* --------------------------------------------------------------
RENDER ANALÍTICO + VISUAL
-------------------------------------------------------------- */

function renderGraphAnalytic() {
    const container = document.getElementById("graphAdvancedContainer");
    if (!container) return;

    container.innerHTML = "";

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    /* ---------------------- ZOOM + PAN ---------------------- */
    const zoom = d3.zoom()
        .scaleExtent([0.4, 2.8])
        .on("zoom", (event) => svgGroup.attr("transform", event.transform));

    const svg = d3.select("#graphAdvancedContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(zoom);

    const svgGroup = svg.append("g");

    /* ---------------------- TOOLTIP ---------------------- */
    const tooltip = d3.select("#graphAdvancedContainer")
        .append("div")
        .attr("class", "graph-tooltip")
        .style("position", "absolute")
        .style("padding", "10px 14px")
        .style("background", "rgba(0,0,0,0.75)")
        .style("border", "1px solid rgba(255,255,255,0.15)")
        .style("border-radius", "8px")
        .style("color", "#fff")
        .style("font-size", "0.8rem")
        .style("pointer-events", "none")
        .style("opacity", 0);

    /* ---------------------- SIMULACIÓN ---------------------- */
    const simulation = d3.forceSimulation(GRAPH_NODES)
        .force("link", d3.forceLink(GRAPH_LINKS).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-350))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => 20 + d.tamaño / 20));

    /* ---------------------- ENLACES ---------------------- */
    const link = svgGroup.selectAll("line")
        .data(GRAPH_LINKS)
        .enter()
        .append("line")
        .attr("stroke", "rgba(255,255,255,0.25)")
        .attr("stroke-width", d => 1 + d.fuerza * 2);

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
        .attr("r", d => 10 + d.tamaño / 20)
        .attr("fill", d => COLOR_MAP[d.tipo] || "#00e5a0")
        .style("filter", d => `drop-shadow(0 0 6px ${COLOR_MAP[d.tipo]})`)
        .call(drag)
        .on("mouseover", (event, d) => {
            tooltip
                .style("opacity", 1)
                .html(`
                    <strong>${d.id}</strong><br>
                    Tipo: ${d.tipo}<br>
                    Tamaño: ${d.tamaño} KB<br>
                    Actualizado: ${d.updated}<br>
                    Conexiones: ${countLinks(d.id)}
                `);
        })
        .on("mousemove", (event) => {
            tooltip
                .style("left", event.offsetX + 15 + "px")
                .style("top", event.offsetY + 15 + "px");
        })
        .on("mouseout", () => tooltip.style("opacity", 0));

    /* ---------------------- ETIQUETAS ---------------------- */
    const labels = svgGroup.selectAll("text")
        .data(GRAPH_NODES)
        .enter()
        .append("text")
        .text(d => d.id)
        .attr("fill", "#fff")
        .attr("font-size", "0.8rem")
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
FUNCIÓN AUXILIAR: contar conexiones
-------------------------------------------------------------- */

function countLinks(id) {
    return GRAPH_LINKS.filter(l => l.source.id === id || l.target.id === id).length;
}

/* --------------------------------------------------------------
ANIMACIÓN DE ENTRADA
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



