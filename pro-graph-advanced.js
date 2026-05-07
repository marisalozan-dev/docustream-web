/* ============================================================
   GRAFO AVANZADO — DocuStream PRO · datos.gob.es
   ============================================================
   El grafo semántico real se construye en demo.html con D3.js
   a partir de los datasets reales de datos.gob.es.

   Este archivo expone renderAdvancedGraph() como alias por si
   otros scripts la llaman, y gestiona el estado vacío inicial.
   ============================================================ */

// Si se llama renderAdvancedGraph desde el navegador de navegación
// antes de que haya datos, mostramos el estado vacío correctamente.
if (typeof window !== 'undefined') {
    // Guardamos una referencia al renderizador real definido en demo.html
    // para que showView('graph-advanced') funcione correctamente.
    const _origRender = window.renderAdvancedGraph;
    window.renderAdvancedGraph = function(data) {
        const container = document.getElementById('graphAdvancedContainer');
        if (!data || !data.nodes || !data.nodes.length) {
            if (container) container.innerHTML =
                '<div class="empty-state" style="padding-top:6rem">' +
                'Realiza una búsqueda en <strong>Documentos</strong> para generar el grafo semántico' +
                '</div>';
            return;
        }
        if (typeof _origRender === 'function') _origRender(data);
    };
}
