/* --------------------------------------------------------------
DocuStream PRO — INTEGRACIONES
Grid PRO · Hover glass · Modal de detalles
-------------------------------------------------------------- */

console.log("Integrations PRO loaded");

const INTEGRATIONS = [
    { id: "int1", name: "Stripe", status: "active", desc: "Pagos y facturación." },
    { id: "int2", name: "SendGrid", status: "active", desc: "Emails transaccionales." },
    { id: "int3", name: "Salesforce", status: "paused", desc: "CRM y ventas." },
    { id: "int4", name: "Slack", status: "active", desc: "Notificaciones internas." }
];

function renderIntegrations() {
    const grid = document.getElementById("integrationsGrid");
    if (!grid) return;

    grid.innerHTML = INTEGRATIONS.map(int => `
        <div class="integration-card" onclick="openIntegration('${int.id}')">
            <h3>${int.name}</h3>
            <span class="badge ${int.status}">
                ${int.status === "active" ? "Activa" : "Pausada"}
            </span>
        </div>
    `).join("");
}

function openIntegration(id) {
    const int = INTEGRATIONS.find(i => i.id === id);
    if (!int) return;

    alert(`Integración: ${int.name}\n\n${int.desc}`);
}

function initIntegrations() {
    renderIntegrations();
}

window.initIntegrations = initIntegrations;
window.openIntegration = openIntegration;


