/* -------------------------------------------------------
   MOBILE MENU
------------------------------------------------------- */

const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileBtn.addEventListener("click", () => {
    if (mobileMenu.style.display === "flex") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "flex";
    }
});

/* Close menu when clicking a link */
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.style.display = "none";
    });
});


/* -------------------------------------------------------
   GSAP HERO ANIMATIONS
------------------------------------------------------- */

gsap.from(".hero-title", {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.2,
    ease: "power3.out"
});

gsap.from(".hero-tagline", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.35,
    ease: "power3.out"
});

gsap.from(".hero-buttons", {
    opacity: 0,
    y: 20,
    duration: 1,
    delay: 0.5,
    ease: "power3.out"
});

/* Large icon */
gsap.from(".hero-icon", {
    opacity: 0,
    x: 60,
    duration: 1.2,
    delay: 0.4,
    ease: "power3.out"
});

/* Mint glow */
gsap.from(".hero-glow", {
    opacity: 0,
    scale: 0.7,
    duration: 1.4,
    delay: 0.6,
    ease: "power2.out"
});


/* -------------------------------------------------------
   SCROLLREVEAL FOR SECTIONS
------------------------------------------------------- */

ScrollReveal().reveal(".section h2", {
    duration: 900,
    distance: "40px",
    origin: "bottom",
    easing: "ease-out",
    opacity: 0
});

ScrollReveal().reveal(".section p, .feature-list li, .roadmap-list li", {
    duration: 900,
    distance: "20px",
    origin: "bottom",
    easing: "ease-out",
    opacity: 0,
    interval: 80
});

