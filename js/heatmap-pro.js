const heatmap = document.getElementById("heatmapContainer");

for (let i = 0; i < 12; i++) {
  const bar = document.createElement("div");
  bar.className = "heatbar";

  const value = Math.random();
  bar.style.height = (value * 200 + 50) + "px";
  bar.style.background = `rgba(255, 80, 0, ${value})`;

  heatmap.appendChild(bar);
}
