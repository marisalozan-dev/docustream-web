// --- HEATMAP PRO ---

const heatmapContainer = document.getElementById("heatmapContainer");
const heatTooltip = document.getElementById("heatTooltip");

// Simulación de datos (0–100)
const heatData = Array.from({ length: 60 }, () => Math.floor(Math.random() * 100));

// Escala de color PRO
function getHeatColor(value) {
  if (value < 20) return "#d6eaff";
  if (value < 40) return "#8ecbff";
  if (value < 60) return "#4aa3ff";
  if (value < 80) return "#1f78ff";
  return "#0050d4";
}

// Crear celdas
heatData.forEach((value, i) => {
  const cell = document.createElement("div");
  cell.className = "heat-cell";
  cell.style.background = getHeatColor(value);

  // Animación suave
  cell.style.opacity = "0";
  setTimeout(() => {
    cell.style.transition = "opacity 0.6s ease";
    cell.style.opacity = "1";
  }, i * 20);

  // Tooltip
  cell.addEventListener("mouseover", () => {
    heatTooltip.textContent = `Intensidad: ${value}`;
    heatTooltip.style.opacity = 1;
  });

  cell.addEventListener("mousemove", (event) => {
    heatTooltip.style.left = event.pageX + 12 + "px";
    heatTooltip.style.top = event.pageY + 12 + "px";
  });

  cell.addEventListener("mouseout", () => {
    heatTooltip.style.opacity = 0;
  });

  heatmapContainer.appendChild(cell);
});

