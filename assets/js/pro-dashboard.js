/* ============================================================
   DASHBOARD — FlowSync Technologies (Caso real)
   ============================================================ */

const dashboardData = {
    kpis: {
        documentsProcessed: 4382,
        avgLatency: 0.6,
        dataQuality: 89,
        anomalies: 27
    },
    activityOverTime: [
        { date: "2025-01-01", docs: 120 },
        { date: "2025-01-02", docs: 240 },
        { date: "2025-01-03", docs: 380 },
        { date: "2025-01-04", docs: 520 },
        { date: "2025-01-05", docs: 760 },
        { date: "2025-01-06", docs: 1020 },
        { date: "2025-01-07", docs: 1380 }
    ],
    dataQualityBreakdown: [
        { label: "Documentación consistente", value: 62 },
        { label: "Pendiente de revisión", value: 21 },
        { label: "Con anomalías", value: 9 },
        { label: "Obsoleta", value: 8 }
    ],
    insights: [
        "Se han procesado 4.382 documentos técnicos y de soporte.",
        "El 62% de la documentación está en estado consistente.",
        "Se han detectado 27 anomalías relevantes en endpoints y manuales.",
        "La latencia media de procesamiento se mantiene por debajo de 1 segundo."
    ]
};

/* ===================== RENDER KPIs ===================== */

document.getElementById("kpiDocs").textContent = dashboardData.kpis.documentsProcessed;
document.getElementById("kpiLatency").textContent = dashboardData.kpis.avgLatency + " s";
document.getElementById("kpiQuality").textContent = dashboardData.kpis.dataQuality + " %";
document.getElementById("kpiAnomalies").textContent = dashboardData.kpis.anomalies;

/* ===================== INSIGHTS ===================== */

const dashboardInsight = document.getElementById("dashboardInsight");
dashboardInsight.innerHTML = `
    <h3>Resumen de FlowSync Technologies</h3>
    <ul>
        ${dashboardData.insights.map(i => `<li>${i}</li>`).join("")}
    </ul>
`;






