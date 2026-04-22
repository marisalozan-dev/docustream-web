console.log("DocuStream EN loaded");

/* ---------------------------------------------
   🌙 DARK MODE PERSISTENT
--------------------------------------------- */

// Load saved preference
const savedTheme = localStorage.getItem("theme");

// Apply saved preference
if (savedTheme === "dark") {
    document.body.classList.add("dark");
} else if (savedTheme === "light") {
    document.body.classList.remove("dark");
} else {
    // If no preference → follow system
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark");
    }
}

// Theme toggle button
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark") ? "dark" : "light"
    );
});


/* ---------------------------------------------
   📱 MOBILE MENU (slide + overlay)
--------------------------------------------- */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

// Create overlay dynamically
const overlay = document.createElement("div");
overlay.classList.add("menu-overlay");
document.body.appendChild(overlay);

// Open/close menu
menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    overlay.style.display = mobileMenu.classList.contains("open") ? "block" : "none";
});

// Close menu when clicking overlay
overlay.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    overlay.style.display = "none";
});


/* ---------------------------------------------
   🎬 GSAP ANIMATIONS
--------------------------------------------- */

// Hero animation
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
   👀 SCROLL REVEAL
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
