/* --------------------------------------------------------------
DocuStream PRO — CORE ENGINE
Navegación · Estado global · Animaciones · Persistencia
-------------------------------------------------------------- */

console.log("DocuStream PRO — Core Engine loaded");

/* --------------------------------------------------------------
ESTADO GLOBAL
-------------------------------------------------------------- */

const PRO_STATE = {
    currentView: localStorage.getItem("pro-current-view") || "dashboard",
    filters: {
        type: "all",
        period: 30,
        density: "all"
    }
};

/* --------------------------------------------------------------
NAVEGACIÓN ENTRE VISTAS
-------------------------------------------------------------- */

function showView(view) {
    PRO_STATE.currentView = view;
    localStorage.setItem("pro-current-view", view);

    // Ocultar todas las vistas
    document.querySelectorAll(".pro-view").forEach(v => {
        v.classList.remove("active-view");
    });

    // Mostrar la vista seleccionada
    const target = document.getElementById(`view-${view}`);
    if (target) {
        target.classList.add("active-view");

        // Animación suave al cambiar de vista
        gsap.from(target, {
            opacity: 0,
            y: 20,
            duration: 0.35,
            ease: "power2.out"
        });
    }

    // Actualizar botón activo del sidebar
    document.querySelectorAll(".sidebar nav button")
        .forEach(btn => btn.classList.remove("active-btn"));

    const activeBtn = document.querySelector(`button[onclick="showView('${view}')"]`);
    if (activeBtn) activeBtn.classList.add("active-btn");

    // Animación del contenido interno
    animateViewContent(view);

    // Inicializar módulos según vista
    if (view === "dashboard" && typeof initDashboard === "function") initDashboard();
    if (view === "documents" && typeof initDocuments === "function") initDocuments();
    if (view === "integrations" && typeof initIntegrations === "function") initIntegrations();
    if (view === "graph-advanced" && typeof initGraphAdvanced === "function") initGraphAdvanced();

    // Highlight del sidebar
    updateSidebarActive(view);
}

/* --------------------------------------------------------------
ANIMACIÓN GLOBAL DE ENTRADA DE VISTA
-------------------------------------------------------------- */

function animateViewContent(view) {
    const container = document.getElementById(`view-${view}`);
    if (!container) return;

    gsap.from(container.children, {
        opacity: 0,
        y: 12,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.06
    });
}

/* --------------------------------------------------------------
SIDEBAR — HIGHLIGHT DEL BOTÓN ACTIVO
-------------------------------------------------------------- */

function updateSidebarActive(view) {
    document.querySelectorAll(".sidebar nav button").forEach(btn => {
        btn.classList.remove("active-sidebar-btn");

        if (btn.getAttribute("onclick")?.includes(view)) {
            btn.classList.add("active-sidebar-btn");
        }
    });
}

/* --------------------------------------------------------------
FILTROS GLOBALES
-------------------------------------------------------------- */

function setupFilters() {
    const type = document.getElementById("filterType");
    const period = document.getElementById("filterPeriod");
    const density = document.getElementById("filterDensity");

    if (!type || !period || !density) return;

    type.addEventListener("change", applyFilters);
    period.addEventListener("change", applyFilters);
    density.addEventListener("change", applyFilters);
}

function applyFilters() {
    PRO_STATE.filters = {
        type: document.getElementById("filterType").value,
        period: parseInt(document.getElementById("filterPeriod").value),
        density: document.getElementById("filterDensity").value
    };

    if (typeof updateDashboard === "function") updateDashboard(PRO_STATE.filters);
    if (typeof updateHeatmap === "function") updateHeatmap(PRO_STATE.filters);
}

/* --------------------------------------------------------------
ANIMACIONES INICIALES
-------------------------------------------------------------- */

function runInitialAnimations() {
    gsap.from(".sidebar", {
        x: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
    });
}

/* --------------------------------------------------------------
INICIALIZACIÓN GLOBAL
-------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Inicializando DocuStream PRO…");

    setupFilters();
    runInitialAnimations();

    // Restaurar última vista
    showView(PRO_STATE.currentView);
});

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.showView = showView;
window.applyFilters = applyFilters;




