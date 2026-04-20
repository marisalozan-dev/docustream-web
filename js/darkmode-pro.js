const toggle = document.getElementById("darkToggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};
// --- DONUT MODO OSCURO ---
function updateDonutColors(isDark) {
  if (!ctx) return;

  const newColors = isDark
    ? ['#27ae60', '#d4ac0d']   // versión oscura
    : ['#2ecc71', '#f1c40f'];  // versión clara

  donutChart.data.datasets[0].backgroundColor = newColors;
  donutChart.update();
}
updateDonutColors(document.body.classList.contains('dark'));

