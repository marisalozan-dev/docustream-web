/* ============================================================
   INTEGRACIONES — DocuStream PRO · datos.gob.es
   ============================================================ */

const integrationsData = [
    {
        name: "datos.gob.es",
        type: "Catálogo nacional de datos abiertos",
        status: "Conectado",
        statusColor: "#4db87a",
        description: "Ingesta en tiempo real del catálogo oficial del Ministerio de Transformación Digital. Más de 50.000 datasets indexados.",
        icon: "🏛️"
    },
    {
        name: "API SPARQL",
        type: "Linked Open Data",
        status: "Conectado",
        statusColor: "#4db87a",
        description: "Consultas semánticas sobre el grafo de datos enlazados de la administración pública española.",
        icon: "🔗"
    },
    {
        name: "INE",
        type: "Instituto Nacional de Estadística",
        status: "En piloto",
        statusColor: "#c8b84a",
        description: "Integración con series estadísticas oficiales: demografía, economía, mercado laboral y más.",
        icon: "📊"
    },
    {
        name: "AEMET OpenData",
        type: "Datos meteorológicos",
        status: "En piloto",
        statusColor: "#c8b84a",
        description: "Datasets climáticos y meteorológicos de la Agencia Estatal de Meteorología.",
        icon: "🌤️"
    },
    {
        name: "Portal Europeo de Datos",
        type: "data.europa.eu",
        status: "Planificado",
        statusColor: "#A7E8FF",
        description: "Extensión al catálogo europeo con más de 1,5 millones de datasets de 36 países.",
        icon: "🇪🇺"
    },
    {
        name: "Slack / Teams",
        type: "Alertas y notificaciones",
        status: "Planificado",
        statusColor: "#A7E8FF",
        description: "Notificaciones automáticas cuando se detectan anomalías o datasets críticos desactualizados.",
        icon: "🔔"
    }
];

function renderIntegrations() {
    const grid = document.getElementById("integrationsGrid");
    if (!grid) return;

    grid.innerHTML = integrationsData.map(int => `
        <div class="int-card">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
                <span style="font-size:1.4rem">${int.icon}</span>
                <h3 style="margin:0">${int.name}</h3>
            </div>
            <p><strong>Tipo:</strong> ${int.type}</p>
            <p style="margin:6px 0">
                <strong>Estado:</strong>
                <span style="display:inline-block;margin-left:6px;padding:2px 10px;border-radius:6px;font-size:0.78rem;background:${int.statusColor}22;color:${int.statusColor};border:1px solid ${int.statusColor}44;font-weight:600">
                    ${int.status}
                </span>
            </p>
            <p style="margin-top:8px;font-size:0.85rem;color:#666">${int.description}</p>
        </div>
    `).join("");
}

renderIntegrations();
