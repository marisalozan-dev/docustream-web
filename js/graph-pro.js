const svg = d3.select("#graphCanvas");
const width = +svg.attr("width");
const height = +svg.attr("height");

const nodes = d3.range(15).map(() => ({ radius: 10 }));
const links = d3.range(20).map(() => ({
  source: Math.floor(Math.random() * 15),
  target: Math.floor(Math.random() * 15)
}));

const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).distance(120))
  .force("charge", d3.forceManyBody().strength(-200))
  .force("center", d3.forceCenter(width / 2, height / 2));

const link = svg.append("g")
  .attr("stroke", "#aaa")
  .selectAll("line")
  .data(links)
  .enter().append("line");

const node = svg.append("g")
  .selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 10)
  .attr("fill", () => ["#0F6E56", "#534AB7", "#7A4DF3", "#F7D154"][Math.floor(Math.random()*4)])
  .call(d3.drag()
    .on("start", dragstart)
    .on("drag", dragged)
    .on("end", dragend)
  );

function dragstart(event) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

function dragend(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}

simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
});
document.getElementById("graphCanvas").classList.add("fade-in");


