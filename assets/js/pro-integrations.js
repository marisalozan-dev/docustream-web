/* --------------------------------------------------------------
DocuStream PRO — INTEGRACIONES
APIs, conectores, pipelines y servicios externos
-------------------------------------------------------------- */

console.log("Integraciones PRO loaded");

/* --------------------------------------------------------------
DATOS DE EJEMPLO (simulación realista)
-------------------------------------------------------------- */

const INTEGRATIONS_DATA = [
    {
        id: 1,
        name: "API REST · Document Ingest",
        status: "active",
        latency: "120 ms",
        description: "Endpoint para ingesta masiva de documentos con validación automática.",
        icon: "📥",
        tags: ["API", "Ingesta", "Automatización"]
    },
    {
        id: 2,
        name: "Webhook · Eventos de Procesado",
        status: "active",
        latency: "80 ms",
        description: "Notificaciones en tiempo real cuando un documento ha sido procesado.",
        icon: "🔔",
        tags: ["Webhooks", "Eventos", "Tiempo real"]
    },
    {
        id: 3,
        name: "Conector · Azure Cognitive Services",
        status: "active",
        latency: "210 ms",
        description: "Integración con OCR, NER y análisis semántico avanzado.",
        icon: "🧠",
        tags: ["IA", "OCR", "NER"]
    },
    {
        id: 4,
        name: "Pipeline · Limpieza y Normalización",
        status: "paused",
        latency: "—",
        description: "Pipeline ETL para normalizar documentos antes del análisis.",
        icon: "⚙️",
        tags: ["ETL", "Normalización", "Preprocesado"]
    },
    {
        id: 5,
        name: "SDK · Python Client",
        status: "active",
        latency: "—",
        description: "Librería Python para interactuar con DocuStream desde scripts y notebooks.",
        icon: "🐍",
        tags: ["SDK", "Python", "Developers"]
    }
];

/* --------------------------------------------------------------
INICIALIZACIÓN
-------------------------------------------------------------- */

function initIntegrations() {
    console.log("Inicializando Integraciones PRO…");
    renderIntegrations();
}

/* --------------------------------------------------------------
RENDER DEL GRID
-------------------------------------------------------------- */

function renderIntegrations() {
    const grid = document.getElementById("integrationsGrid");
    if (!grid) return;

    grid.innerHTML = INTEGRATIONS_DATA.map(int => `
        <div class="integration-card ${int.status}">
            <div class="integration-icon">${int.icon}</div>

            <div class="integration-info">
                <h3>${int.name}</h3>
                <p>${int.description}</p>

                <div class="integration-tags">
                    ${int.tags.map(t => `<span>${t}</span>`).join("")}
                </div>
            </div>

            <div class="integration-meta">
                <span class="integration-status ${int.status}">
                    ${int.status === "active" ? "Activo" : "Pausado"}
                </span>
                <span class="integration-latency">${int.latency}</span>
            </div>
        </div>
    `).join("");
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initIntegrations = initIntegrations;

