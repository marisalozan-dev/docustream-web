/* ============================================================
   INTEGRACIONES — FlowSync Technologies
   ============================================================ */

const integrationsData = [
    {
        name: "GitHub",
        type: "Repositorio de código",
        status: "Conectado",
        description: "Ingesta automática de documentación técnica desde la carpeta /docs y archivos README."
    },
    {
        name: "Confluence",
        type: "Wiki interna",
        status: "Conectado",
        description: "Sincronización de espacios de documentación funcional y técnica."
    },
    {
        name: "Notion",
        type: "Knowledge base",
        status: "En piloto",
        description: "Integración con playbooks internos y documentación de procesos."
    },
    {
        name: "Google Drive",
        type: "Almacenamiento",
        status: "Conectado",
        description: "Procesamiento de manuales de soporte, PDFs y documentación histórica."
    },
    {
        name: "Slack",
        type: "Comunicación",
        status: "Conectado",
        description: "Alertas de anomalías y cambios críticos en canales de ingeniería y soporte."
    },
    {
        name: "Jira",
        type: "Gestión de issues",
        status: "Planificado",
        description: "Vinculación de documentación con incidencias y tareas de desarrollo."
    }
];

function renderIntegrations() {
    const grid = document.getElementById("integrationsGrid");
    grid.innerHTML = integrationsData.map(int => `
        <div class="int-card">
            <h3>${int.name}</h3>
            <p><strong>Tipo:</strong> ${int.type}</p>
            <p><strong>Estado:</strong> ${int.status}</p>
            <p>${int.description}</p>
        </div>
    `).join("");
}

renderIntegrations();





