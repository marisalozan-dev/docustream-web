console.log("DocuStream ES loaded");

/* ---------------------------------------------
   🌙 DARK MODE PERSISTENTE
--------------------------------------------- */

// Leer preferencia guardada
const savedTheme = localStorage.getItem("theme");

// Aplicar preferencia guardada
if (savedTheme === "dark") {
    document.body.classList.add("dark");
} else if (savedTheme === "light") {
    document.body.classList.remove("dark");
} else {
    // Si no hay preferencia guardada → usar modo del sistema
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark");
    }
}

// Botón de cambio de tema
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});


/* ---------------------------------------------
   📱 MENÚ MÓVIL PREMIUM (slide + overlay)
--------------------------------------------- */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Crear overlay dinámicamente
const overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

// Abrir/cerrar menú
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    overlay.style.display = mobileMenu.classList.contains("open") ? "block" : "none";
});

// Cerrar menú al pulsar overlay
overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    overlay.style.display = "none";
});


/* ---------------------------------------------
   🎬 ANIMACIONES GSAP
--------------------------------------------- */

// Animación del hero
gsap.from(".hero-content", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out"
});

gsap.from(".hero-img", {
    opacity: 0,
    x: 40,
    duration: 1,
    delay: 0.2,
    ease: "power2.out"
});


/* ---------------------------------------------
   👀 SCROLL REVEAL (suave y elegante)
--------------------------------------------- */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.style.opacity = 1;
            el.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

