/* --------------------------------------------------------------
DocuStream PRO — GRAFO AVANZADO
D3.js · Zoom · Pan · Sidebar dinámico · Movimiento orgánico
-------------------------------------------------------------- */

console.log("Graph Advanced PRO loaded");

/* --------------------------------------------------------------
DATOS SIMULADOS DEL GRAFO
-------------------------------------------------------------- */

const GRAPH_DATA = {
    nodes: [
        { id: "doc1", label: "OAuth 2.0", type: "document", confidence: 0.94 },
        { id: "doc2", label: "Facturación", type: "document", confidence: 0.88 },
        { id: "doc3", label: "Manual Panel", type: "document", confidence: 0.91 },

        { id: "ent1", label: "Token", type: "entity" },
        { id: "ent2", label: "Scopes", type: "entity" },
        { id: "ent3", label: "Errores", type: "entity" },
        { id: "ent4", label: "Factura", type: "entity" },
        { id: "ent5", label: "Cliente", type: "entity" },
        { id: "ent6", label: "Dashboard", type: "entity" }
    ],
    links: [
        { source: "doc1", target: "ent1" },
        { source: "doc1", target: "ent2" },
        { source: "doc1", target: "ent3" },

        { source: "doc2", target: "ent4" },
        { source: "doc2", target: "ent5" },

        { source: "doc3", target: "ent6" }
    ]
};

/* --------------------------------------------------------------
TOOLTIP PRO
-------------------------------------------------------------- */

const graphTooltip = document.createElement("div");
graphTooltip.className = "graph-tooltip";
graphTooltip.style.position = "absolute";
graphTooltip.style.padding = "10px 14px";
graphTooltip.style.background = "rgba(0,0,0,0.75)";
graphTooltip.style.border = "1px solid #00e5a055";
graphTooltip.style.borderRadius = "10px";
graphTooltip.style.color = "#fff";
graphTooltip.style.fontSize = "0.85rem";
graphTooltip.style.pointerEvents = "none";
graphTooltip.style.opacity = "0";
graphTooltip.style.transition = "opacity 0.2s ease";
graphTooltip.style.backdropFilter = "blur(6px)";
document.body.appendChild(graphTooltip);

/* --------------------------------------------------------------
INICIALIZACIÓN DEL GRAFO
-------------------------------------------------------------- */

let graphSvg, graphSim, graphLink, graphNode;

function initGraphAdvanced() {
    console.log("Inicializando Grafo Avanzado PRO…");

    const container = document.getElementById("graphContainer");
    if (!container) return;

    container.innerHTML = ""; // limpiar

    const width = container.clientWidth;
    const height = 500;

    graphSvg = d3.select("#graphContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const graphSvgGroup = graphSvg.append("g");

    const zoom = d3.zoom().on("zoom", (event) => {
        graphSvgGroup.attr("transform", event.transform);
    });

    graphSvg.call(zoom);

    graphLink = graphSvgGroup
        .selectAll("line")
        .data(GRAPH_DATA.links)
        .enter()
        .append("line")
        .attr("stroke", "#00e5a055")
        .attr("stroke-width", 1.5);

    graphNode = graphSvgGroup
        .selectAll("circle")
        .data(GRAPH_DATA.nodes)
        .enter()
        .append("circle")
        .attr("r", 14)
        .attr("fill", d => d.type === "document" ? "#00e5a0" : "#00e5a055")
        .attr("stroke", "#00e5a0")
        .attr("stroke-width", 1.5)
        .call(dragNode())
        .on("mouseover", (event, d) => {
            graphTooltip.innerHTML = `
                <strong>${d.label}</strong><br>
                Tipo: ${d.type}<br>
                Confianza: ${(d.confidence || 0.9 * 100).toFixed(1)}%
            `;
            graphTooltip.style.opacity = "1";
        })
        .on("mousemove", (event) => {
            graphTooltip.style.left = event.pageX + 15 + "px";
            graphTooltip.style.top = event.pageY + 15 + "px";
        })
        .on("mouseout", () => {
            graphTooltip.style.opacity = "0";
        })
        .on("click", (_, d) => updateGraphSidebar(d));

    graphSim = d3.forceSimulation(GRAPH_DATA.nodes)
        .force("link", d3.forceLink(GRAPH_DATA.links).id(d => d.id).distance(120))
        .force("charge", d3.forceManyBody().strength(-260))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(40))
        .on("tick", ticked);

    function ticked() {
        graphLink
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        graphNode
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }
}

/* --------------------------------------------------------------
DRAG DE NODOS
-------------------------------------------------------------- */

function dragNode() {
    return d3.drag()
        .on("start", (event, d) => {
            if (!event.active) graphSim.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        })
        .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
        })
        .on("end", (event, d) => {
            if (!event.active) graphSim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        });
}

/* --------------------------------------------------------------
SIDEBAR DINÁMICO
-------------------------------------------------------------- */

function updateGraphSidebar(nodeData) {
    const sidebar = document.getElementById("graphSidebarContent");
    if (!sidebar) return;

    if (!nodeData) {
        sidebar.innerHTML = "<p>Selecciona un nodo para ver detalles.</p>";
        return;
    }

    sidebar.innerHTML = `
        <h2>${nodeData.label}</h2>
        <p><strong>Tipo:</strong> ${nodeData.type}</p>
        <p><strong>Confianza:</strong> ${(nodeData.confidence || 0.9 * 100).toFixed(1)}%</p>
        <p><strong>ID:</strong> ${nodeData.id}</p>
    `;
}

/* --------------------------------------------------------------
ACTUALIZACIÓN POR FILTROS
-------------------------------------------------------------- */

function updateGraphAdvanced(state) {
    console.log("Actualizando grafo con filtros:", state);

    graphNode
        .transition()
        .duration(300)
        .attr("opacity", d => {
            if (state.docType !== "all" && d.type === "document") return 0.4;
            return 1;
        });
}
/* --------------------------------------------------------------
ANIMACIÓN DE ENTRADA DEL GRAFO
-------------------------------------------------------------- */

function animateGraph() {
    const graph = document.getElementById("graphAdvancedContainer");

    gsap.from(graph, {
        opacity: 0,
        scale: 0.96,
        duration: 0.45,
        ease: "power2.out"
    });
}

document.addEventListener("DOMContentLoaded", animateGraph);


/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initGraphAdvanced = initGraphAdvanced;
window.updateGraphAdvanced = updateGraphAdvanced;
