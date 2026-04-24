/* --------------------------------------------------------------
DOCUMENTOS PRO — Lista, Preview, Mini-grafo
-------------------------------------------------------------- */

console.log("Documents PRO loaded");

/* --------------------------------------------------------------
DATOS DE EJEMPLO
-------------------------------------------------------------- */

const DOCUMENTS = [
    {
        id: 1,
        title: "Contrato de servicio",
        content: "Cláusulas clave del contrato de servicio entre proveedor y cliente, con SLAs y anexos técnicos."
    },
    {
        id: 2,
        title: "Informe mensual de actividad",
        content: "Resumen ejecutivo de la actividad documental, métricas de uso y tendencias por departamento."
    },
    {
        id: 3,
        title: "Política de privacidad",
        content: "Documento legal que regula el tratamiento de datos personales y el cumplimiento normativo."
    }
];

/* --------------------------------------------------------------
INICIALIZACIÓN
-------------------------------------------------------------- */

function initDocuments() {
    console.log("Inicializando Documentos PRO…");
    renderDocumentList();
}

/* --------------------------------------------------------------
RENDER DE LISTA DE DOCUMENTOS
-------------------------------------------------------------- */

function renderDocumentList() {
    const list = document.getElementById("documentsList");
    if (!list) return;

    list.innerHTML = "";

    DOCUMENTS.forEach(doc => {
        const item = document.createElement("div");
        item.className = "doc-item";
        item.innerHTML = `
            <strong>${doc.title}</strong>
            <p style="opacity:0.7; font-size:0.85rem; margin-top:4px;">
                ID #${doc.id} · Documento estructurado
            </p>
        `;
        item.onclick = () => selectDocument(doc);
        list.appendChild(item);
    });

    animateDocumentCards();
}

/* --------------------------------------------------------------
ANIMACIÓN DE CARDS DE DOCUMENTOS
-------------------------------------------------------------- */

function animateDocumentCards() {
    const cards = document.querySelectorAll(".doc-item");
    if (!cards.length) return;

    gsap.from(cards, {
        opacity: 0,
        y: 14,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05
    });
}

/* --------------------------------------------------------------
SELECCIÓN DE DOCUMENTO + PREVIEW
-------------------------------------------------------------- */

function selectDocument(doc) {
    const preview = document.getElementById("documentsPreviewContent");
    if (!preview) return;

    gsap.fromTo(
        preview,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );

    preview.innerHTML = `
        <h3>${doc.title}</h3>
        <p style="margin-top:8px; line-height:1.5;">
            ${doc.content}
        </p>
        <div style="margin-top:16px; font-size:0.85rem; opacity:0.8;">
            Grafo semántico del documento:
        </div>
        <div id="miniGraph-${doc.id}" class="mini-graph"></div>
    `;

    renderMiniGraph(`miniGraph-${doc.id}`);
}

/* --------------------------------------------------------------
MINI-GRAFO D3 POR DOCUMENTO
-------------------------------------------------------------- */

function renderMiniGraph(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";

    const width = container.clientWidth || 220;
    const height = container.clientHeight || 140;

    const nodes = [
        { id: "Nodo A" },
        { id: "Nodo B" },
        { id: "Nodo C" }
    ];

    const links = [
        { source: "Nodo A", target: "Nodo B" },
        { source: "Nodo B", target: "Nodo C" }
    ];

    const svg = d3.select(`#${containerId}`)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(50))
        .force("charge", d3.forceManyBody().strength(-120))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", "rgba(0, 229, 160, 0.35)")
        .attr("stroke-width", 2);

    const node = svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 6)
        .attr("fill", "#00e5a0");

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
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initDocuments = initDocuments;





