// TARJETAS
const cards = document.getElementById("cards");

const metrics = [
  { label: "Obsolescencia", value: "85%" },
  { label: "Tiempo consulta", value: "42ms" },
  { label: "Secciones ignoradas", value: "38%" }
];

metrics.forEach(m => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<h2>${m.value}</h2><p>${m.label}</p>`;
  cards.appendChild(div);
});

// DONUT
const donut = document.getElementById("donutChart").getContext("2d");
new Chart(donut, {
  type: "doughnut",
  data: {
    labels: ["Actualizado", "Desactualizado"],
    datasets: [{
      data: [72, 28],
      backgroundColor: ["#0F6E56", "#F7D154"]
    }]
  }
});

// LÍNEA
const line = document.getElementById("lineChart").getContext("2d");
new Chart(line, {
  type: "line",
  data: {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie"],
    datasets: [{
      label: "Obsolescencia",
      data: [20, 30, 45, 50, 65],
      borderColor: "#534AB7",
      tension: 0.4
    }]
  }
});

