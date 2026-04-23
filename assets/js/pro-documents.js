/* --------------------------------------------------------------
DocuStream PRO — DOCUMENTOS
Búsqueda instantánea · Vista previa · Mini-grafo
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
ABRIR DOCUMENTO
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
        <div class="mini-graph">
            ${doc.entities
                .map(e => `<span class="mini-node">${e}</span>`)
                .join("")}
        </div>
    `;
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



