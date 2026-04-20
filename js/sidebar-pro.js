// --- SIDEBAR PRO ---

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
  sidebar.classList.toggle('open');
  menuToggle.classList.toggle('active');
  overlay.classList.toggle('visible');
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleSidebar);
}

if (overlay) {
  overlay.addEventListener('click', toggleSidebar);
}




