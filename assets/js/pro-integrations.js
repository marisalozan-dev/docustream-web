/* --------------------------------------------------------------
INTEGRACIONES PRO — Cards + Estados + Animación
-------------------------------------------------------------- */

console.log("Integrations PRO loaded");

/* --------------------------------------------------------------
DATOS DE EJEMPLO
-------------------------------------------------------------- */

const INTEGRATIONS = [
    { name: "Stripe", status: "active", description: "Pagos y facturación automática." },
    { name: "SendGrid", status: "active", description: "Notificaciones por correo transaccional." },
    { name: "Salesforce", status: "paused", description: "CRM y pipeline comercial." },
    { name: "Slack", status: "active", description: "Alertas en tiempo real al equipo." }
];

/* --------------------------------------------------------------
INICIALIZACIÓN
-------------------------------------------------------------- */

function initIntegrations() {
    console.log("Inicializando Integraciones PRO…");
    renderIntegrations();
}

/* --------------------------------------------------------------
RENDER DE INTEGRACIONES
-------------------------------------------------------------- */

function renderIntegrations() {
    const grid = document.getElementById("integrationsGrid");
    if (!grid) return;

    grid.innerHTML = "";

    INTEGRATIONS.forEach(int => {
        const card = document.createElement("div");
        card.className = "integration-card";

        card.innerHTML = `
            <h3>${int.name}</h3>
            <p style="margin-top:6px; font-size:0.85rem; opacity:0.8;">
                ${int.description}
            </p>
            <span class="badge ${int.status}">
                ${int.status === "active" ? "Activa" : "Pausada"}
            </span>
        `;

        grid.appendChild(card);
    });

    animateIntegrationCards();
}

/* --------------------------------------------------------------
ANIMACIÓN DE CARDS DE INTEGRACIONES
-------------------------------------------------------------- */

function animateIntegrationCards() {
    const cards = document.querySelectorAll(".integration-card");
    if (!cards.length) return;

    gsap.from(cards, {
        opacity: 0,
        y: 14,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05
    });
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL
-------------------------------------------------------------- */

window.initIntegrations = initIntegrations;




