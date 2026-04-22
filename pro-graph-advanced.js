/* -------------------------------------------------------
   DocuStream PRO — GRAFO SEMÁNTICO AVANZADO
   Zoom + pan + clusters + highlight + panel lateral
------------------------------------------------------- */

console.log("Graph Advanced PRO loaded");

let graphAdvSvg = null;
let graphAdvSimulation = null;
let graphAdvZoom = null;

/* -------------------------------------------------------
   INICIALIZACIÓN
------------------------------------------------------- */

function initGraphAdvanced() {
    const container = document.getElementById("graphAdvanced");

    // Limpiar si ya existe
    container.innerHTML = "";

    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // Crear SVG con zoom
    graphAdvSvg = d3.select("#graphAdvanced")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "rgba(0,0,0,0.35)")
        .call(
            d3.zoom()
                .scaleExtent([0.4, 2.5])
                .on("zoom", (event) => {
                    g.attr("transform", event.transform);
                })
        );

    const g = graphAdvSvg.append("g");

    // Crear datos
    const graphData = generateAdvancedGraphData();

    // Renderizar
    renderGraphAdvanced(g, graphData, width, height);
}

/* -------------------------------------------------------
   GENERADOR DE DATOS AVANZADOS
------------------------------------------------------- */

function generateAdvancedGraphData() {
    const types = ["API", "Spec", "Manual", "Incident"];
    const nodes = [];
    const links = [];

    for (let i = 0; i < 22; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        nodes.push({
            id: "N" + i,
            type,
            relevance: Math.random(),
            label: `${type} #${i}`
        });
    }

    for (let i = 0; i < 32; i++) {
        links.push({
            source: "N" + Math.floor(Math.random() * nodes.length),
            target: "N" + Math.floor(Math.random() * nodes.length),
            weight: Math.random()
        });
    }

    return { nodes, links };
}

/* -------------------------------------------------------
   RENDERIZAR GRAFO AVANZADO
------------------------------------------------------- */

function renderGraphAdvanced(g, data, width, height) {

    graphAdvSimulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links)
            .id(d => d.id)
            .distance(d => 80 + d.weight * 40)
            .strength(0.6))
        .force("charge", d3.forceManyBody().strength(-220))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(28));

    /* --------------------------
       ENLACES
    --------------------------- */
    const link = g.append("g")
        .attr("stroke", "rgba(0,229,160,0.25)")
        .attr("stroke-width", 1.2)
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line");

    /* --------------------------
       NODOS
    --------------------------- */
    const node = g.append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", d => 10 + d.relevance * 6)
        .attr("fill", d => {
            const colors = {
                API: "rgba(0,229,160,0.9)",
                Spec: "rgba(0,229,160,0.6)",
                Manual: "rgba(0,229,160,0.4)",
                Incident: "rgba(0,229,160,0.25)"
            };
            return colors[d.type];
        })
        .attr("stroke", "rgba(255,255,255,0.15)")
        .attr("stroke-width", 1.5)
        .style("cursor", "pointer")
        .call(dragNode(graphAdvSimulation))
        .on("mouseover", highlightNode)
        .on("mouseout", resetHighlight)
        .on("click", openNodeSidebar);

    /* --------------------------
       HALOS
    --------------------------- */
    const halo = g.append("g")
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("r", d => 22 + d.relevance * 10)
        .attr("fill", "rgba(0,229,160,0.08)");

    /* --------------------------
       TOOLTIP
    --------------------------- */
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "graph-tooltip")
        .style("opacity", 0);

    node.on("mousemove", (event, d) => {
        tooltip
            .style("opacity", 1)
            .style("left", event.pageX + 12 + "px")
            .style("top", event.pageY + 12 + "px")
            .html(`
                <strong>${d.label}</strong><br>
                Tipo: ${d.type}<br>
                Relevancia: ${(d.relevance * 100).toFixed(0)}%
            `);
    });

    node.on("mouseout", () => {
        tooltip.style("opacity", 0);
    });

    /* --------------------------
       SIMULACIÓN
    --------------------------- */
    graphAdvSimulation.on("tick", () => {
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
   DRAG
------------------------------------------------------- */

function dragNode(simulation) {
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
   HIGHLIGHT
------------------------------------------------------- */

function highlightNode(event, d) {
    d3.selectAll("circle").attr("opacity", 0.25);
    d3.select(this).attr("opacity", 1);

    d3.selectAll("line")
        .attr("stroke", l =>
            l.source.id === d.id || l.target.id === d.id
                ? "rgba(0,229,160,0.8)"
                : "rgba(0,229,160,0.1)"
        );
}

function resetHighlight() {
    d3.selectAll("circle").attr("opacity", 1);
    d3.selectAll("line").attr("stroke", "rgba(0,229,160,0.25)");
}

/* -------------------------------------------------------
   PANEL LATERAL
------------------------------------------------------- */

function openNodeSidebar(event, d) {
    const sidebar = document.getElementById("graphSidebar");
    const content = document.getElementById("graphSidebarContent");

    sidebar.classList.remove("hidden");

    content.innerHTML = `
        <h2>${d.label}</h2>
        <p><strong>Tipo:</strong> ${d.type}</p>
        <p><strong>Relevancia:</strong> ${(d.relevance * 100).toFixed(0)}%</p>
        <p><strong>ID:</strong> ${d.id}</p>
    `;
}

/* -------------------------------------------------------
   EXPONER FUNCIÓN
------------------------------------------------------- */

window.initGraphAdvanced = initGraphAdvanced;
