const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const overlay = document.getElementById("overlay");

// ABRIR / CERRAR SIDEBAR EN MÓVIL
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("visible");
});

// CERRAR AL HACER CLICK FUERA
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  menuToggle.classList.remove("active");
  overlay.classList.remove("visible");
});

// CERRAR AL HACER CLICK EN UN ENLACE
document.querySelectorAll(".sidebar nav a").forEach(link => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    menuToggle.classList.remove("active");
    overlay.classList.remove("visible");
  });
});








