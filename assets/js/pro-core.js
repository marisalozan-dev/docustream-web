/* --------------------------------------------------------------
DocuStream PRO — CORE ENGINE
-------------------------------------------------------------- */

console.log("DocuStream PRO — Core Engine loaded");

/* ESTADO GLOBAL */
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

        gsap.from(target, {
            opacity: 0,
            y: 20,
            duration: 0.35,
            ease: "power2.out"
        });
    }

    // Botón activo del sidebar
    document.querySelectorAll(".sidebar nav button")
        .forEach(btn => btn.classList.remove("active-btn"));

    const activeBtn = document.querySelector(`button[onclick="showView('${view}')"]`);
    if (activeBtn) activeBtn.classList.add("active-btn");

    // Animación del contenido
    animateViewContent(view);

    // Inicializar módulos
    if (view === "dashboard" && typeof initDashboard === "function") initDashboard();
    if (view === "documents" && typeof initDocuments === "function") initDocuments();
    if (view === "integrations" && typeof initIntegrations === "function") initIntegrations();
    if (view === "graph-advanced" && typeof initGraphAdvanced === "function") initGraphAdvanced();
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
INICIALIZACIÓN GLOBAL
-------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Inicializando DocuStream PRO…");
    showView(PRO_STATE.currentView);
});

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.showView = showView;





