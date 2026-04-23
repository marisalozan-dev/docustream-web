/* --------------------------------------------------------------
DocuStream PRO — DASHBOARD
KPIs dinámicos · Gráfico de líneas · Donut · Insight
-------------------------------------------------------------- */

console.log("Dashboard PRO loaded");

/* --------------------------------------------------------------
GENERACIÓN DE DATOS SIMULADOS
-------------------------------------------------------------- */

function generateDashboardData(state) {
    const days = state.period || 30;

    const daily = Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        docs: Math.floor(20 + Math.random() * 80)
    }));

    const totalDocs = daily.reduce((acc, d) => acc + d.docs, 0);
    const latency = Math.floor(80 + Math.random() * 120);
    const quality = Math.floor(85 + Math.random() * 10);
    const anomalies = Math.floor(Math.random() * 12);

    return {
        docs: totalDocs,
        latency,
        quality,
        anomalies,
        daily
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
INSIGHT DINÁMICO
-------------------------------------------------------------- */

function updateDashboardInsight(data, state) {
    const el = document.getElementById("dashboardInsight");
    if (!el) return;

    const periodText =
        state.period === 7 ? "los últimos 7 días" :
        state.period === 90 ? "los últimos 90 días" :
        "los últimos 30 días";

    el.innerHTML = `
        <h3>Insight automático</h3>
        <p>
            En ${periodText}, DocuStream PRO procesó
            <strong>${data.docs}</strong> documentos,
            con una calidad media del
            <strong>${data.quality}%</strong> y una latencia media de
            <strong>${data.latency} ms</strong>.
        </p>
    `;
}

/* --------------------------------------------------------------
GRÁFICO DE LÍNEAS (ACTIVIDAD POR DÍA)
-------------------------------------------------------------- */

function renderActivityChart(dailyData) {
    const container = document.getElementById("activityChart");
    if (!container) return;

    container.innerHTML = "";
    const width = container.clientWidth || 400;
    const height = 220;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select("#activityChart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const x = d3.scaleLinear()
        .domain([1, d3.max(dailyData, d => d.day)])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(dailyData, d => d.docs)]).nice()
        .range([height - margin.bottom, margin.top]);

    const line = d3.line()
        .x(d => x(d.day))
        .y(d => y(d.docs))
        .curve(d3.curveMonotoneX);

    svg.append("path")
        .datum(dailyData)
        .attr("fill", "none")
        .attr("stroke", "#00e5a0")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(4).tickFormat(d => `D${d}`))
        .attr("color", "#666");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(4))
        .attr("color", "#666");

    svg.append("text")
        .attr("x", margin.left)
        .attr("y", margin.top)
        .attr("fill", "#ccc")
        .attr("font-size", "0.85rem")
        .text("Actividad diaria (documentos)");
}

/* --------------------------------------------------------------
DONUT CHART (CALIDAD DEL DATO)
-------------------------------------------------------------- */

function renderQualityDonut(quality) {
    const container = document.getElementById("qualityDonut");
    if (!container) return;

    container.innerHTML = "";
    const width = container.clientWidth || 260;
    const height = 220;
    const radius = Math.min(width, height) / 2 - 10;

    const svg = d3.select("#qualityDonut")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

    const data = { calidad: quality, restante: 100 - quality };

    const color = d3.scaleOrdinal()
        .domain(["calidad", "restante"])
        .range(["#00e5a0", "#222"]);

    const pie = d3.pie()
        .value(d => d[1]);

    const data_ready = pie(Object.entries(data));

    svg.selectAll("path")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius))
        .attr("fill", d => color(d.data[0]))
        .attr("stroke", "#050505")
        .style("stroke-width", "2px");

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "-0.2em")
        .attr("fill", "#fff")
        .attr("font-size", "1.4rem")
        .text(`${quality}%`);

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "1.2em")
        .attr("fill", "#aaa")
        .attr("font-size", "0.8rem")
        .text("Calidad del dato");
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

    updateDashboardInsight(data, PRO_STATE);
    renderActivityChart(data.daily);
    renderQualityDonut(data.quality);
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

    updateDashboardInsight(data, state);
    renderActivityChart(data.daily);
    renderQualityDonut(data.quality);
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initDashboard = initDashboard;
window.updateDashboard = updateDashboard;



