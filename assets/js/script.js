console.log("DocuStream ES loaded");

// Dark mode automático
if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark");
}

document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
    mobileMenu.style.display =
        mobileMenu.style.display === "flex" ? "none" : "flex";
});

// GSAP hero animation
gsap.from(".hero-content", { opacity: 0, y: 40, duration: 1 });
gsap.from(".hero-img", { opacity: 0, x: 40, duration: 1 });

// Scroll reveal
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
