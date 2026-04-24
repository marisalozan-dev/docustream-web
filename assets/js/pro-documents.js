/* --------------------------------------------------------------
DocuStream PRO — DOCUMENTOS
Búsqueda instantánea · Vista previa · Mini-grafo D3 real
-------------------------------------------------------------- */

console.log("Documents PRO loaded");

/* --------------------------------------------------------------
DATOS SIMULADOS
-------------------------------------------------------------- */

const DOCUMENTS_DATA = [
    {
        id: "doc1",
        title: "OAuth 2.0",
        type: "api",
        summary: "Protocolo de autorización seguro para aplicaciones.",
        entities: ["Token", "Scopes", "Errores"],
        quality: 94
    },
    {
        id: "doc2",
        title: "Facturación",
        type: "manual",
        summary: "Guía completa del sistema de facturación.",
        entities: ["Factura", "Cliente"],
        quality: 88
    },
    {
        id: "doc3",
        title: "Manual del Panel",
        type: "manual",
        summary: "Documentación del panel administrativo.",
        entities: ["Dashboard"],
        quality: 91
    }
];

/* --------------------------------------------------------------
RENDER LISTA
-------------------------------------------------------------- */

function renderDocumentsList(filter = "") {
    const list = document.getElementById("documentsList");
    if (!list) return;

    const filtered = DOCUMENTS_DATA.filter(doc =>
        doc.title.toLowerCase().includes(filter.toLowerCase())
    );

    list.innerHTML = filtered
        .map(doc => `
            <div class="doc-item" onclick="openDocument('${doc.id}')">
                <h4>${doc.title}</h4>
                <p class="doc-type">${doc.type.toUpperCase()}</p>
            </div>
        `)
        .join("");
}

/* --------------------------------------------------------------
ABRIR DOCUMENTO + MINI-GRAFO REAL
-------------------------------------------------------------- */

function openDocument(id) {
    const doc = DOCUMENTS_DATA.find(d => d.id === id);
    const preview = document.getElementById("documentsPreviewContent");

    if (!doc || !preview) return;

    preview.innerHTML = `
        <h2>${doc.title}</h2>
        <p><strong>Tipo:</strong> ${doc.type}</p>
        <p><strong>Calidad:</strong> ${doc.quality}%</p>
        <p>${doc.summary}</p>

        <h3>Entidades detectadas</h3>
        <ul>
            ${doc.entities.map(e => `<li>${e}</li>`).join("")}
        </ul>

        <h3>Mini-grafo</h3>
        <div id="miniGraphContainer" class="mini-graph-panel"></div>
    `;

    renderMiniGraph(doc);
}

/* --------------------------------------------------------------
MINI-GRAFO D3
-------------------------------------------------------------- */

function renderMiniGraph(doc) {
    const container = document.getElementById("miniGraphContainer");
    if (!container) return;

    container.innerHTML = "";

    const width = container.clientWidth || 260;
    const height = 180;

    const nodes = [
        { id: doc.title, type: "document" },
        ...doc.entities.map(e => ({ id: e, type: "entity" }))
    ];

    const links = doc.entities.map(e => ({
        source: doc.title,
        target: e
    }));

    const svg = d3.select("#miniGraphContainer")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const g = svg.append("g");

    const sim = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(60))
        .force("charge", d3.forceManyBody().strength(-120))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = g.selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke", "#00e5a055")
        .attr("stroke-width", 1.5);

    const node = g.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", d => d.type === "document" ? 16 : 10)
        .attr("fill", d => d.type === "document" ? "#00e5a0" : "#00e5a055")
        .attr("stroke", "#00e5a0")
        .attr("stroke-width", 1.5);

    const label = g.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text(d => d.id)
        .attr("font-size", "0.7rem")
        .attr("fill", "#ccc")
        .attr("text-anchor", "middle")
        .attr("dy", -18);

    sim.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
}

/* --------------------------------------------------------------
BÚSQUEDA INSTANTÁNEA
-------------------------------------------------------------- */

function setupDocumentSearch() {
    const input = document.createElement("input");
    input.className = "doc-search";
    input.placeholder = "Buscar documento…";

    input.addEventListener("input", () => {
        renderDocumentsList(input.value);
    });

    const container = document.querySelector(".documents-container");
    container.prepend(input);
}

/* --------------------------------------------------------------
INICIALIZAR
-------------------------------------------------------------- */

function initDocuments() {
    setupDocumentSearch();
    renderDocumentsList();
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initDocuments = initDocuments;
window.openDocument = openDocument;

/* --------------------------------------------------------------
ANIMACIÓN DE CARDS DE DOCUMENTOS
-------------------------------------------------------------- */

function animateDocumentCards() {
    const cards = document.querySelectorAll(".doc-item");

    gsap.from(cards, {
        opacity: 0,
        y: 14,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05
    });
}

document.addEventListener("DOMContentLoaded", animateDocumentCards);

function selectDocument(doc) {
    const preview = document.getElementById("documentsPreviewContent");

    // Animación suave del panel
    gsap.fromTo(preview, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );

    preview.innerHTML = doc.content;
}





