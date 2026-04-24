/* --------------------------------------------------------------
DocuStream PRO — CORE ENGINE (FULL PRO)
-------------------------------------------------------------- */

console.log("DocuStream PRO — Core Engine loaded");

const PRO_STATE = {
    currentView: localStorage.getItem("pro-current-view") || "dashboard",
    filters: {
        type: "all",
        period: 30,
        density: "all"
    }
};

/* ========================= NAVEGACIÓN ========================= */

function showView(view) {
    PRO_STATE.currentView = view;
    localStorage.setItem("pro-current-view", view);

    // Cambiar vista activa
    document.querySelectorAll(".pro-view").forEach(v => v.classList.remove("active-view"));
    const target = document.getElementById(`view-${view}`);
    if (target) target.classList.add("active-view");

    // Botón activo en sidebar
    document.querySelectorAll(".sidebar nav button")
        .forEach(btn => btn.classList.remove("active-btn"));

    const activeBtn = document.querySelector(`button[onclick="showView('${view}')"]`);
    if (activeBtn) activeBtn.classList.add("active-btn");

    // Animación de entrada
    animateViewContent(view);

    // 🔥 INICIALIZACIÓN DE MÓDULOS (con timing correcto)
    switch (view) {
        case "dashboard":
            initDashboard();
            break;

        case "documents":
            initDocuments();
            break;

        case "integrations":
            initIntegrations();
            break;

        case "graph-advanced":
            // Doble requestAnimationFrame → garantiza que el contenedor ya tiene tamaño real
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    initGraphAdvanced();
                });
            });
            break;
    }
}

/* ========================= ANIMACIÓN ========================= */

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

/* ========================= INIT ========================= */

document.addEventListener("DOMContentLoaded", () => {
    showView(PRO_STATE.currentView);
});

window.showView = showView;






