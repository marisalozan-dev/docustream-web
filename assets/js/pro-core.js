/* --------------------------------------------------------------
DocuStream PRO — CORE ENGINE
Coordinación de vistas, filtros, animaciones y módulos
-------------------------------------------------------------- */

console.log("Core PRO loaded");

/* --------------------------------------------------------------
ESTADO GLOBAL
-------------------------------------------------------------- */

const PRO_STATE = {
    docType: "all",
    period: 30,
    density: "all"
};

/* --------------------------------------------------------------
INICIALIZACIÓN GENERAL
-------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Inicializando DocuStream PRO…");

    // Animaciones iniciales
    gsap.from(".pro-sidebar", { x: -40, opacity: 0, duration: 0.6, ease: "power2.out" });
    gsap.from(".pro-topbar", { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" });

    // Inicializar vista activa
    initActiveView();

    // Activar filtros globales
    setupFilters();
});

/* --------------------------------------------------------------
DETECTAR QUÉ VISTA ESTÁ ACTIVA AL CARGAR
-------------------------------------------------------------- */

function initActiveView() {
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
        // Reiniciar sidebar
        const sidebar = document.getElementById("graphSidebarContent");
        if (sidebar) {
            sidebar.innerHTML = "<p>Selecciona un nodo para ver detalles.</p>";
        }

        if (typeof initGraphAdvanced === "function") initGraphAdvanced();
    }
}

/* --------------------------------------------------------------
CAMBIO DE VISTAS
-------------------------------------------------------------- */

function switchView(viewId) {
    console.log("Cambiando a vista:", viewId);

    document.querySelectorAll(".pro-view").forEach(v => v.classList.remove("active-view"));
    document.getElementById(viewId).classList.add("active-view");

    document.querySelectorAll(".pro-nav button").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`button[data-view="${viewId}"]`)?.classList.add("active");

    // Inicializar la vista correspondiente
    if (viewId === "view-dashboard") {
        if (typeof initDashboard === "function") initDashboard();
        if (typeof initHeatmap === "function") initHeatmap();
    }

    if (viewId === "view-documents" && typeof initDocuments === "function") {
        initDocuments();
    }

    if (viewId === "view-integrations" && typeof initIntegrations === "function") {
        initIntegrations();
    }

    if (viewId === "view-graph") {
        // Reiniciar sidebar SIEMPRE antes de inicializar el grafo
        const sidebar = document.getElementById("graphSidebarContent");
        if (sidebar) {
            sidebar.innerHTML = "<p>Selecciona un nodo para ver detalles.</p>";
        }

        if (typeof initGraphAdvanced === "function") initGraphAdvanced();
    }
}

/* --------------------------------------------------------------
FILTROS GLOBALES
-------------------------------------------------------------- */

function setupFilters() {
    const docType = document.getElementById("filterDocType");
    const period = document.getElementById("filterPeriod");
    const density = document.getElementById("filterDensity");

    if (!docType || !period || !density) return;

    docType.addEventListener("change", () => {
        PRO_STATE.docType = docType.value;
        applyFilters();
    });

    period.addEventListener("change", () => {
        PRO_STATE.period = parseInt(period.value);
        applyFilters();
    });

    density.addEventListener("change", () => {
        PRO_STATE.density = density.value;
        applyFilters();
    });
}

/* --------------------------------------------------------------
APLICAR FILTROS A TODOS LOS MÓDULOS
-------------------------------------------------------------- */

function applyFilters() {
    console.log("Aplicando filtros:", PRO_STATE);

    if (typeof updateDashboard === "function") updateDashboard(PRO_STATE);
    if (typeof updateHeatmap === "function") updateHeatmap(PRO_STATE);
    if (typeof updateGraphAdvanced === "function") updateGraphAdvanced(PRO_STATE);
}

/* --------------------------------------------------------------
UTILIDADES
-------------------------------------------------------------- */

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.switchView = switchView;
window.PRO_STATE = PRO_STATE;

