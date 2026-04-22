/* -------------------------------------------------------
   DocuStream PRO — CORE ENGINE
   Inicialización general, filtros, animaciones y estado.
------------------------------------------------------- */

console.log("DocuStream PRO Demo · Core engine loaded");

/* -------------------------------------------------------
   ESTADO GLOBAL DE LA DEMO
------------------------------------------------------- */

const PRO_STATE = {
    docType: "all",
    period: 30,
    density: "all"
};


/* -------------------------------------------------------
   INICIALIZACIÓN GENERAL
------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Inicializando DocuStream PRO…");

    // Animación de entrada del layout
    gsap.from(".pro-sidebar", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".pro-topbar", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out"
    });

    gsap.from(".pro-kpi-card", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        stagger: 0.1,
        ease: "power3.out"
    });

    // Inicializar solo el dashboard al cargar
    if (typeof initDashboard === "function") {
        initDashboard();
    }

    // Activar filtros
    setupFilters();
});


/* -------------------------------------------------------
   FILTROS
------------------------------------------------------- */

function setupFilters() {
    const filterDocType = document.getElementById("filterDocType");
    const filterPeriod = document.getElementById("filterPeriod");
    const filterDensity = document.getElementById("filterDensity");

    if (!filterDocType || !filterPeriod || !filterDensity) return;

    filterDocType.addEventListener("change", () => {
        PRO_STATE.docType = filterDocType.value;
        applyFilters();
    });

    filterPeriod.addEventListener("change", () => {
        PRO_STATE.period = parseInt(filterPeriod.value);
        applyFilters();
    });

    filterDensity.addEventListener("change", () => {
        PRO_STATE.density = filterDensity.value;
        applyFilters();
    });
}


/* -------------------------------------------------------
   APLICAR FILTROS A TODOS LOS MÓDULOS
------------------------------------------------------- */

function applyFilters() {
    console.log("Aplicando filtros:", PRO_STATE);

    // Dashboard
    if (typeof updateDashboard === "function") {
        updateDashboard(PRO_STATE);
    }

    // Grafo avanzado
    if (typeof updateGraphAdvanced === "function") {
        updateGraphAdvanced(PRO_STATE);
    }

    // Heatmap
    if (typeof updateHeatmap === "function") {
        updateHeatmap(PRO_STATE);
    }

    // Microanimación al aplicar filtros
    gsap.from(".pro-panel", {
        opacity: 0.6,
        duration: 0.4,
        ease: "power1.out"
    });
}


/* -------------------------------------------------------
   UTILIDADES
------------------------------------------------------- */

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomPercent() {
    const sign = Math.random() > 0.5 ? "+" : "-";
    return sign + (Math.random() * 20).toFixed(1) + "%";
}


/* -------------------------------------------------------
   NAVEGACIÓN ENTRE VISTAS
------------------------------------------------------- */

function switchView(viewId) {
    console.log("Cambiando a vista:", viewId);

    // Ocultar todas las vistas
    document.querySelectorAll(".pro-view").forEach(v => {
        v.classList.remove("active-view");
    });

    // Mostrar la vista seleccionada
    const view = document.getElementById(viewId);
    if (view) {
        view.classList.add("active-view");
    } else {
        console.warn("Vista no encontrada:", viewId);
    }

    // Activar botón del sidebar
    document.querySelectorAll(".pro-nav button").forEach(btn => {
        btn.classList.remove("active");
    });

    const activeBtn = document.querySelector(`[data-view="${viewId}"]`);
    if (activeBtn) {
        activeBtn.classList.add("active");
    }

    // Inicializar módulos según vista
    if (viewId === "view-dashboard" && typeof initDashboard === "function") initDashboard();
    if (viewId === "view-graph" && typeof initGraphAdvanced === "function") initGraphAdvanced();
    if (viewId === "view-documents" && typeof initDocuments === "function") initDocuments();
    if (viewId === "view-integrations" && typeof initIntegrations === "function") initIntegrations();
}

window.switchView = switchView;


/* -------------------------------------------------------
   EXPONER FUNCIONES GLOBALES
------------------------------------------------------- */

window.PRO_STATE = PRO_STATE;
window.applyFilters = applyFilters;
window.randomInt = randomInt;
window.randomPercent = randomPercent;


