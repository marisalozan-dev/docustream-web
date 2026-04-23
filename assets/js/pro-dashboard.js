/* --------------------------------------------------------------
DocuStream PRO — DASHBOARD
KPIs dinámicos · Animaciones GSAP · Datos simulados
-------------------------------------------------------------- */

console.log("Dashboard PRO loaded");

/* --------------------------------------------------------------
GENERACIÓN DE DATOS SIMULADOS
-------------------------------------------------------------- */

function generateDashboardData(state) {
    const days = state.period || 30;

    return {
        docs: Math.floor(days * (40 + Math.random() * 60)),
        latency: Math.floor(80 + Math.random() * 120),
        quality: Math.floor(85 + Math.random() * 10),
        anomalies: Math.floor(Math.random() * 12)
    };
}

/* --------------------------------------------------------------
ANIMACIÓN PRO DE KPIs
-------------------------------------------------------------- */

function animateKPI(elementId, newValue) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const current = parseFloat(el.innerText) || 0;

    gsap.fromTo(
        el,
        { innerText: current },
        {
            innerText: newValue,
            duration: 1.2,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: () => {
                el.innerText = Math.floor(el.innerText);
            }
        }
    );

    // Glow suave en la tarjeta
    gsap.fromTo(
        el.parentElement,
        { boxShadow: "0 0 0px rgba(0,229,160,0)" },
        {
            boxShadow: "0 0 18px rgba(0,229,160,0.25)",
            duration: 0.6,
            yoyo: true,
            repeat: 1
        }
    );
}

/* --------------------------------------------------------------
INICIALIZAR DASHBOARD
-------------------------------------------------------------- */

function initDashboard() {
    console.log("Inicializando Dashboard PRO…");

    const data = generateDashboardData(PRO_STATE);

    animateKPI("kpiDocs", data.docs);
    animateKPI("kpiLatency", data.latency);
    animateKPI("kpiQuality", data.quality);
    animateKPI("kpiAnomalies", data.anomalies);
}

/* --------------------------------------------------------------
ACTUALIZAR DASHBOARD POR FILTROS
-------------------------------------------------------------- */

function updateDashboard(state) {
    console.log("Actualizando Dashboard con filtros:", state);

    const data = generateDashboardData(state);

    animateKPI("kpiDocs", data.docs);
    animateKPI("kpiLatency", data.latency);
    animateKPI("kpiQuality", data.quality);
    animateKPI("kpiAnomalies", data.anomalies);
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initDashboard = initDashboard;
window.updateDashboard = updateDashboard;


