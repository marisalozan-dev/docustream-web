/* --------------------------------------------------------------
DocuStream PRO — THEME ENGINE
Modo oscuro forzado · Variables CSS dinámicas
-------------------------------------------------------------- */

console.log("Theme PRO loaded");

/* --------------------------------------------------------------
FORZAR MODO OSCURO SIEMPRE
-------------------------------------------------------------- */

(function () {
    applyDarkTheme();
})();

/* --------------------------------------------------------------
APLICAR MODO OSCURO
-------------------------------------------------------------- */

function applyDarkTheme() {
    document.documentElement.style.setProperty("--bg-main", "#050505");
    document.documentElement.style.setProperty("--bg-panel", "#0d0d0d");
    document.documentElement.style.setProperty("--bg-soft", "#111111");
    document.documentElement.style.setProperty("--text-main", "#ffffff");
    document.documentElement.style.setProperty("--text-soft", "#cccccc");
    document.documentElement.style.setProperty("--accent", "#00e5a0");
    document.documentElement.style.setProperty("--accent-soft", "#00e5a055");

    console.log("Tema aplicado: oscuro (forzado)");
}

/* --------------------------------------------------------------
APLICAR MODO CLARO (NO SE USA, PERO LO DEJO POR SI LO QUIERES)
-------------------------------------------------------------- */

function applyLightTheme() {
    document.documentElement.style.setProperty("--bg-main", "#f5f5f5");
    document.documentElement.style.setProperty("--bg-panel", "#ffffff");
    document.documentElement.style.setProperty("--bg-soft", "#f0f0f0");
    document.documentElement.style.setProperty("--text-main", "#111111");
    document.documentElement.style.setProperty("--text-soft", "#444444");
    document.documentElement.style.setProperty("--accent", "#0F6E56");
    document.documentElement.style.setProperty("--accent-soft", "#0F6E5622");

    console.log("Tema aplicado: claro");
}

/* --------------------------------------------------------------
EXPOSICIÓN GLOBAL (por si luego quieres un botón manual)
-------------------------------------------------------------- */

window.applyDarkTheme = applyDarkTheme;
window.applyLightTheme = applyLightTheme;

