/* --------------------------------------------------------------
DocuStream PRO — DOCUMENTOS
Listado, vista previa, metadatos y mini-grafo
-------------------------------------------------------------- */

console.log("Documents PRO loaded");

/* --------------------------------------------------------------
DATOS DE EJEMPLO (simulación realista)
-------------------------------------------------------------- */

const DOCUMENTS_DATA = [
    {
        id: 1,
        title: "Guía de Integración OAuth 2.0",
        type: "API",
        updated: "Hace 3 días",
        confidence: 0.94,
        entities: ["Endpoint /auth/token", "Scopes", "Grant types", "Errores 401/403/429"],
        relations: [
            "Cliente → Aplicación → API Gateway",
            "Token ↔ Scope ↔ Permisos",
            "Rate limit → Respuesta 429"
        ],
        summary: "Documento técnico que describe el flujo de autenticación OAuth 2.0, incluyendo endpoints, permisos y manejo de errores.",
        heatmap: [12, 18, 25, 9, 4, 7, 15, 22]
    },
    {
        id: 2,
        title: "Especificación del Módulo de Facturación",
        type: "Especificación",
        updated: "Hace 12 días",
        confidence: 0.88,
        entities: ["Factura", "Cliente", "Impuestos", "Estados"],
        relations: [
            "Factura → Cliente",
            "Factura → Impuestos",
            "Factura → Estados"
        ],
        summary: "Especificación funcional y técnica del módulo de facturación, incluyendo entidades clave y reglas de negocio.",
        heatmap: [5, 9, 14, 20, 18, 11, 6, 3]
    },
    {
        id: 3,
        title: "Manual de Usuario — Panel de Control",
        type: "Manual",
        updated: "Hace 1 mes",
        confidence: 0.91,
        entities: ["Dashboard", "Filtros", "Widgets", "Permisos"],
        relations: [
            "Usuario → Dashboard",
            "Dashboard → Widgets",
            "Filtros → Resultados"
        ],
        summary: "Manual de usuario del panel de control, con descripción de funcionalidades, filtros y navegación.",
        heatmap: [3, 4, 6, 12, 19, 21, 17, 8]
    }
];

/* --------------------------------------------------------------
INICIALIZACIÓN
-------------------------------------------------------------- */

function initDocuments() {
    console.log("Inicializando Documentos PRO…");
    renderDocumentsList();
}

/* --------------------------------------------------------------
LISTA DE DOCUMENTOS
-------------------------------------------------------------- */

function renderDocumentsList() {
    const list = document.getElementById("documentsList");
    if (!list) return;

    list.innerHTML = DOCUMENTS_DATA.map(doc => `
        <div class="doc-item" onclick="openDocument(${doc.id})">
            <h4>${doc.title}</h4>
            <p class="doc-meta">${doc.type} · ${doc.updated}</p>
            <div class="doc-confidence">
                <div class="doc-bar" style="width:${doc.confidence * 100}%"></div>
            </div>
        </div>
    `).join("");
}

/* --------------------------------------------------------------
VISTA PREVIA
-------------------------------------------------------------- */

function openDocument(id) {
    const doc = DOCUMENTS_DATA.find(d => d.id === id);
    if (!doc) return;

    const preview = document.getElementById("documentsPreviewContent");
    if (!preview) return;

    preview.innerHTML = `
        <h2>${doc.title}</h2>
        <p class="doc-summary">${doc.summary}</p>

        <h3>Entidades detectadas</h3>
        <ul>
            ${doc.entities.map(e => `<li>${e}</li>`).join("")}
        </ul>

        <h3>Relaciones</h3>
        <ul>
            ${doc.relations.map(r => `<li>${r}</li>`).join("")}
        </ul>

        <h3>Densidad semántica</h3>
        <div class="doc-heatmap">
            ${doc.heatmap.map(v => `<span style="height:${v * 3}px"></span>`).join("")}
        </div>

        <div class="doc-footer">
            <span class="doc-score">Confianza semántica: ${(doc.confidence * 100).toFixed(1)}%</span>
            <button class="pro-btn-ghost" onclick="highlightInGraph(${doc.id})">
                Ver en el grafo
            </button>
        </div>
    `;
}

/* --------------------------------------------------------------
MINI ACCIÓN: ENVIAR AL GRAFO
-------------------------------------------------------------- */

function highlightInGraph(id) {
    console.log("Destacando documento en el grafo:", id);
    alert("Simulación: el grafo resaltaría las entidades de este documento.");
}
