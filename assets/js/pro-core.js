// Inicializar módulos según vista activa
if (document.getElementById("view-dashboard")?.classList.contains("active-view")) {
    if (typeof initDashboard === "function") initDashboard();
    if (typeof initHeatmap === "function") initHeatmap();
}

if (document.getElementById("view-documents")?.classList.contains("active-view")) {
    if (typeof initDocuments === "function") initDocuments();
}

if (document.getElementById("view-integrations")?.classList.contains("active-view")) {
    if (typeof initIntegrations === "function") initIntegrations();
}

if (document.getElementById("view-graph")?.classList.contains("active-view")) {
    if (typeof initGraphAdvanced === "function") initGraphAdvanced();
}




