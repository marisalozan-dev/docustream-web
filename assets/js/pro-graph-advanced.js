/* ============================================================
   GRAFO AVANZADO — FlowSync Technologies
   ============================================================ */

const graphData = {
    nodes: [
        { id: "FlowSync Documentation System", type: "root" },

        { id: "API Reference v2.1", type: "doc" },
        { id: "API Reference v2.0", type: "doc-obsolete" },
        { id: "User Management Module", type: "module" },
        { id: "Auth Module Overview", type: "module" },
        { id: "QA Checklist – Release 4.3", type: "qa" },
        { id: "Feature Flags Playbook", type: "playbook-anomaly" },
        { id: "Support Manual – Tier 1", type: "support" },
        { id: "Breaking Changes Log", type: "log" },

        { id: "/api/v2/users/{id}", type: "endpoint" },
        { id: "/api/v1/orders", type: "endpoint-anomaly" },
        { id: "Auth Module", type: "component" },
        { id: "Automation Engine", type: "component" }
    ],
    links: [
        { source: "FlowSync Documentation System", target: "API Reference v2.1" },
        { source: "FlowSync Documentation System", target: "API Reference v2.0" },
        { source: "FlowSync Documentation System", target: "User Management Module" },
        { source: "FlowSync Documentation System", target: "Auth Module Overview" },
        { source: "FlowSync Documentation System", target: "QA Checklist – Release 4.3" },
        { source: "FlowSync Documentation System", target: "Feature Flags Playbook" },
        { source: "FlowSync Documentation System", target: "Support Manual – Tier 1" },
        { source: "FlowSync Documentation System", target: "Breaking Changes Log" },

        { source: "API Reference v2.1", target: "/api/v2/users/{id}" },
        { source: "API Reference v2.0", target: "/api/v1/orders" },

        { source: "/api/v2/users/{id}", target: "User Management Module" },
        { source: "/api/v1/orders", target: "Automation Engine" },

        { source: "Auth Module Overview", target: "Auth Module" },
        { source: "Breaking Changes Log", target: "/api/v1/orders" },
        { source: "Feature Flags Playbook", target: "Automation Engine" }
    ]
};

/* ===================== RENDER GRAFO ===================== */

function renderAdvancedGraph() {
    const container = d3.select("#graphAdvancedContainer");
    container.selectAll("*").remove();

    const width = container.node().clientWidth;
    const height = container.node().clientHeight;

    const svg = container.append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(graphData.nodes)
        .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(120))
        .force("charge", d3.forceManyBody().strength(-250))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(graphData.links)
        .enter()
        .append("line")
        .attr("stroke", "#E9EEF2")
        .attr("stroke-width", 1.2);

    const node = svg.append("g")
        .selectAll("circle")
        .data(graphData.nodes)
        .enter()
        .append("circle")
        .attr("r", d => d.type === "root" ? 14 : 8)
        .attr("fill", d => {
            if (d.type === "root") return "#7ED7A1";
            if (d.type.includes("anomaly")) return "#FFB8A8";
            if (d.type.includes("obsolete")) return "#FFF4B8";
            if (["qa", "support", "log"].includes(d.type)) return "#A7E8FF";
            return "#CFFFE5";
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );

    const labels = svg.append("g")
        .selectAll("text")
        .data(graphData.nodes)
        .enter()
        .append("text")
        .text(d => d.id)
        .attr("font-size", 10)
        .attr("fill", "#4A4A4A");

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        labels
            .attr("x", d => d.x + 10)
            .attr("y", d => d.y + 4);
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

renderAdvancedGraph();



