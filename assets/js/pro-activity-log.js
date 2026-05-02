/* ============================================================
   ACTIVITY LOG — FlowSync Technologies
   ============================================================ */

const activityLogData = [
    {
        time: "2025-01-07 11:24",
        type: "Actualización",
        item: "API Reference v2.1",
        detail: "Se añadió documentación de nuevos endpoints de órdenes."
    },
    {
        time: "2025-01-07 10:02",
        type: "Anomalía",
        item: "/api/v1/orders",
        detail: "Endpoint deprecated sigue referenciado en un manual de soporte."
    },
    {
        time: "2025-01-06 17:45",
        type: "Revisión",
        item: "Feature Flags Playbook",
        detail: "Se detectaron referencias a flags retiradas."
    },
    {
        time: "2025-01-06 15:10",
        type: "Actualización",
        item: "QA Checklist – Release 4.3",
        detail: "Nuevos casos de prueba añadidos."
    },
    {
        time: "2025-01-06 09:32",
        type: "Ingesta",
        item: "Support Manual – Tier 1",
        detail: "Nueva versión importada desde Google Drive."
    }
];

function renderActivityLog() {
    const container = document.getElementById("activityLog");
    if (!container) return;

    container.innerHTML = `
        <h3>Actividad reciente</h3>
        <ul class="activity-log-list">
            ${activityLogData.map(ev => `
                <li>
                    <span class="activity-time">${ev.time}</span>
                    <span class="activity-type">${ev.type}</span>
                    <span class="activity-item">${ev.item}</span>
                    <p class="activity-detail">${ev.detail}</p>
                </li>
            `).join("")}
        </ul>
    `;
}

renderActivityLog();
