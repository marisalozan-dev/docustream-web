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
// --- DONUT CHART PRO ---

const ctx = document.getElementById('donutChart');

if (ctx) {
  const donutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Actualizado', 'Desactualizado'],
      datasets: [{
        data: [85, 15],
        backgroundColor: ['#2ecc71', '#f1c40f'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      cutout: '70%',
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1200
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        },
        legend: {
          display: false
        }
      }
    }
  });

  // Actualizar etiqueta central dinámicamente
  const donutLabel = document.getElementById('donutLabel');
  donutLabel.textContent = '85%';
}


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

