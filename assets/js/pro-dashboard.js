/* --------------------------------------------------------------
DocuStream PRO — DASHBOARD
KPIs, tarjetas y resumen de actividad
-------------------------------------------------------------- */

console.log("Dashboard PRO loaded");

/* --------------------------------------------------------------
INICIALIZACIÓN
-------------------------------------------------------------- */

function initDashboard() {
    console.log("Inicializando Dashboard PRO…");
    updateDashboard(PRO_STATE);
}

/* --------------------------------------------------------------
ACTUALIZAR KPIs SEGÚN PRO_STATE
-------------------------------------------------------------- */

function updateDashboard(state) {
    const kpiDocs = document.getElementById("kpiDocs");
    const kpiLatency = document.getElementById("kpiLatency");
    const kpiQuality = document.getElementById("kpiQuality");
    const kpiAnomalies = document.getElementById("kpiAnomalies");

    if (!kpiDocs || !kpiLatency || !kpiQuality || !kpiAnomalies) return;

    const baseDocs = 1240;
    const factorPeriod = state.period / 30;

    const docsValue = Math.round(baseDocs * factorPeriod);
    const latencyValue = (120 / factorPeriod).toFixed(0);
    const qualityValue = (92 + (Math.random() * 4 - 2)).toFixed(1);
    const anomaliesValue = Math.max(0, Math.round(32 / factorPeriod - randomInt(0, 5)));

    kpiDocs.textContent = docsValue.toLocaleString("es-ES");
    kpiLatency.textContent = `${latencyValue} ms`;
    kpiQuality.textContent = `${qualityValue} %`;
    kpiAnomalies.textContent = anomaliesValue;

    animateKpiCard("#kpiDocs");
    animateKpiCard("#kpiLatency");
    animateKpiCard("#kpiQuality");
    animateKpiCard("#kpiAnomalies");
}

/* --------------------------------------------------------------
ANIMACIÓN SUAVE DE KPIs
-------------------------------------------------------------- */

function animateKpiCard(selector) {
    const el = document.querySelector(selector)?.closest(".pro-kpi-card");
    if (!el) return;

    gsap.fromTo(el,
        { scale: 1 },
        {
            scale: 1.03,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power1.out"
        }
    );
}
