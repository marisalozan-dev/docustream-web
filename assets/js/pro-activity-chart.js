/* ============================================================
   GRÁFICO DE ACTIVIDAD — FlowSync Technologies
   ============================================================ */

function renderActivityChart() {
    const container = d3.select("#activityChart");
    container.selectAll("*").remove();

    const width = 500;
    const height = 260;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    const x = d3.scaleBand()
        .domain(dashboardData.activityOverTime.map(d => d.date))
        .range([margin.left, width - margin.right])
        .padding(0.3);

    const y = d3.scaleLinear()
        .domain([0, d3.max(dashboardData.activityOverTime, d => d.docs)])
        .nice()
        .range([height - margin.bottom, margin.top]);

    svg.append("g")
        .selectAll("rect")
        .data(dashboardData.activityOverTime)
        .enter()
        .append("rect")
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.docs))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.docs))
        .attr("fill", "#7ED7A1");

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(d => d.slice(5)));

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
}

renderActivityChart();
