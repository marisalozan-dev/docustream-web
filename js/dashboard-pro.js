/* -------------------------------------------------------
   DocuStream PRO — DASHBOARD MODULE
   Gráficos: línea + donut + actualización por filtros
------------------------------------------------------- */

console.log("Dashboard PRO loaded");

/* -------------------------------------------------------
   VARIABLES DE GRÁFICOS
------------------------------------------------------- */

let chartLine = null;
let chartDonut = null;


/* -------------------------------------------------------
   INICIALIZACIÓN
------------------------------------------------------- */

function initDashboard() {
    createLineChart();
    createDonutChart();
}


/* -------------------------------------------------------
   GRÁFICO DE LÍNEA
------------------------------------------------------- */

function createLineChart() {
    const ctx = document.getElementById("chartLine").getContext("2d");

    const data = generateLineData(PRO_STATE.period);

    chartLine = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.labels,
            datasets: [{
                label: "Documentos procesados",
                data: data.values,
                borderColor: "#00E5A0",
                backgroundColor: "rgba(0,229,160,0.15)",
                tension: 0.35,
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: {
                    ticks: { color: "#aaa" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                },
                y: {
                    ticks: { color: "#aaa" },
                    grid: { color: "rgba(255,255,255,0.05)" }
                }
            }
        }
    });
}


/* -------------------------------------------------------
   GRÁFICO DONUT
------------------------------------------------------- */

function createDonutChart() {
    const ctx = document.getElementById("chartDonut").getContext("2d");

    const data = generateDonutData(PRO_STATE.docType);

    chartDonut = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["APIs", "Especificaciones", "Manuales", "Incidencias"],
            datasets: [{
                data: data.values,
                backgroundColor: [
                    "rgba(0,229,160,0.8)",
                    "rgba(0,229,160,0.55)",
                    "rgba(0,229,160,0.35)",
                    "rgba(0,229,160,0.2)"
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "65%",
            plugins: { legend: { labels: { color: "#ccc" } } }
        }
    });
}


/* -------------------------------------------------------
   ACTUALIZACIÓN POR FILTROS
------------------------------------------------------- */

function updateDashboard(state) {
    // Actualizar línea
    const newLine = generateLineData(state.period);
    chartLine.data.labels = newLine.labels;
    chartLine.data.datasets[0].data = newLine.values;
    chartLine.update();

    // Actualizar donut
    const newDonut = generateDonutData(state.docType);
    chartDonut.data.datasets[0].data = newDonut.values;
    chartDonut.update();

    // Microanimación
    gsap.from("#chartLine", { opacity: 0, duration: 0.4 });
    gsap.from("#chartDonut", { opacity: 0, duration: 0.4 });
}


/* -------------------------------------------------------
   GENERADORES DE DATOS
------------------------------------------------------- */

function generateLineData(period) {
    const labels = [];
    const values = [];

    const months = {
        30: 6,
        90: 9,
        365: 12
    };

    const count = months[period] || 6;

    for (let i = count; i >= 1; i--) {
        labels.push(`Mes -${i}`);
        values.push(randomInt(80, 300));
    }

    return { labels, values };
}

function generateDonutData(docType) {
    let base = {
        api: [40, 20, 20, 20],
        spec: [20, 40, 20, 20],
        manual: [20, 20, 40, 20],
        incident: [20, 20, 20, 40],
        all: [25, 25, 25, 25]
    };

    return { values: base[docType] || base.all };
}


/* -------------------------------------------------------
   EXPONER FUNCIONES
------------------------------------------------------- */

window.initDashboard = initDashboard;
window.updateDashboard = updateDashboard;
