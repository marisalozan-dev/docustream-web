// Sidebar responsive
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });
}
/* --- SIDEBAR PRO --- */

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  padding: 2rem 1rem;
  transform: translateX(-100%);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  z-index: 1002;
  box-shadow: 0 0 0 rgba(0,0,0,0);
}

.sidebar.open {
  transform: translateX(0);
  box-shadow: 8px 0 25px rgba(0,0,0,0.45);
}

/* Links del sidebar */
.sidebar nav a {
  display: block;
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.25s ease, transform 0.2s ease;
}

.sidebar nav a:hover {
  background: rgba(255,255,255,0.12);
  transform: translateX(4px);
}

/* --- OVERLAY (fondo oscuro al abrir menú) --- */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(2px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 1001;
}

.overlay.visible {
  opacity: 1;
  pointer-events: auto;
}

/* En pantallas grandes, sidebar siempre visible */
@media (min-width: 900px) {
  .sidebar {
    transform: translateX(0);
    position: static;
    height: auto;
    box-shadow: none;
    backdrop-filter: none;
  }

  .overlay {
    display: none;
  }

  .menu-toggle {
    display: none;
  }
}


