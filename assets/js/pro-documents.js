/* ============================================================
   DOCUMENTOS — FlowSync Technologies
   ============================================================ */

const documentsData = [
    {
        id: 1,
        title: "API Reference v2.1",
        type: "Documentación técnica",
        team: "Backend",
        status: "Consistente",
        lastUpdated: "2025-01-06",
        summary: "Referencia oficial de la API v2.1, incluyendo endpoints de usuarios, órdenes y autenticación."
    },
    {
        id: 2,
        title: "API Reference v2.0",
        type: "Documentación técnica",
        team: "Backend",
        status: "Obsoleta",
        lastUpdated: "2024-11-18",
        summary: "Versión anterior de la API. Marcada como obsoleta, pero aún referenciada en algunos manuales."
    },
    {
        id: 3,
        title: "User Management Module",
        type: "Módulo de producto",
        team: "Product",
        status: "Pendiente de revisión",
        lastUpdated: "2025-01-03",
        summary: "Descripción funcional del módulo de gestión de usuarios, roles y permisos."
    },
    {
        id: 4,
        title: "Auth Module Overview",
        type: "Módulo de producto",
        team: "Backend",
        status: "Consistente",
        lastUpdated: "2025-01-05",
        summary: "Arquitectura del módulo de autenticación, flujos OAuth2 y tokens de acceso."
    },
    {
        id: 5,
        title: "QA Checklist – Release 4.3",
        type: "QA / Testing",
        team: "QA",
        status: "Consistente",
        lastUpdated: "2025-01-04",
        summary: "Checklist de pruebas funcionales y de regresión para la release 4.3."
    },
    {
        id: 6,
        title: "Feature Flags Playbook",
        type: "Playbook",
        team: "Product",
        status: "Con anomalías",
        lastUpdated: "2024-12-20",
        summary: "Guía de uso de feature flags. Se han detectado referencias a flags ya retiradas."
    },
    {
        id: 7,
        title: "Support Manual – Tier 1",
        type: "Soporte",
        team: "Support",
        status: "Pendiente de revisión",
        lastUpdated: "2024-12-28",
        summary: "Manual de respuestas rápidas para el equipo de soporte de primer nivel."
    },
    {
        id: 8,
        title: "Breaking Changes Log",
        type: "Registro",
        team: "Backend",
        status: "Consistente",
        lastUpdated: "2025-01-02",
        summary: "Registro centralizado de cambios rompientes en la plataforma."
    }
];

/* ===================== RENDER LISTA ===================== */

function renderDocumentsList() {
    const listEl = document.getElementById("documentsList");
    listEl.innerHTML = documentsData.map(doc => `
        <div class="doc-item" onclick="showDocumentPreview(${doc.id})">
            <h3>${doc.title}</h3>
            <p>${doc.type} · ${doc.team}</p>
            <span class="doc-status">${doc.status}</span>
        </div>
    `).join("");
}

/* ===================== PREVIEW ===================== */

function showDocumentPreview(id) {
    const doc = documentsData.find(d => d.id === id);
    const preview = document.getElementById("documentsPreviewContent");
    preview.innerHTML = `
        <h3>${doc.title}</h3>
        <p><strong>Tipo:</strong> ${doc.type}</p>
        <p><strong>Equipo:</strong> ${doc.team}</p>
        <p><strong>Estado:</strong> ${doc.status}</p>
        <p><strong>Última actualización:</strong> ${doc.lastUpdated}</p>
        <p>${doc.summary}</p>
    `;
}

renderDocumentsList();






