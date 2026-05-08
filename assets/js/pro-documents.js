/* ---------------------------------------------------------
   DOCUSTREAM PRO — DOCUMENTOS (Versión Optimizada JSON‑LD)
   --------------------------------------------------------- */

const DocumentosPRO = {
  data: [],
  filtered: [],

  async init() {
    try {
      const url =
        "https://corsproxy.io/?url=" +
        encodeURIComponent(
          "https://datos.gob.es/apidata/catalog/dataset/title/salud.json?_pageSize=20&_sort=-modified"
        );

      const res = await fetch(url);
      const json = await res.json();

      const items = json?.result?.items || [];

      this.data = items.map(item => this.parseItem(item));
      this.filtered = [...this.data];

      this.renderList();
      this.attachSearch();
    } catch (err) {
      console.error("Error cargando Documentos PRO:", err);
      document.querySelector("#docs-list").innerHTML =
        `<p class="error">No se pudieron cargar los documentos.</p>`;
    }
  },

  /* ---------------------------------------------------------
     PARSER JSON‑LD OPTIMIZADO
     --------------------------------------------------------- */
  parseItem(item) {
    const clean = txt =>
      typeof txt === "string"
        ? txt.replace(/\s+/g, " ").trim()
        : txt || "No disponible";

    // Descripción del dataset
    const descripcion =
      item.description?.[0]?._value ||
      item["dct:description"]?.[0]?._value ||
      "Sin descripción";

    // Publicador (si existe)
    const publisher =
      item.publisher?.[0]?._value ||
      item["dct:publisher"]?.[0]?._value ||
      "No disponible";

    // Distribuciones (recursos)
    const distribuciones = (item.distribution || []).map(dist => ({
      titulo:
        dist.title?.[0]?._value ||
        dist["dct:title"]?.[0]?._value ||
        "Recurso sin título",
      url: dist.accessURL || "",
      formato: dist.format?.value || "Desconocido"
    }));

    return {
      id: item._about || "",
      descripcion: clean(descripcion),
      publisher: clean(publisher),
      distribuciones
    };
  },

  /* ---------------------------------------------------------
     RENDER LISTA
     --------------------------------------------------------- */
  renderList() {
    const container = document.querySelector("#docs-list");
    if (!container) return;

    container.innerHTML = this.filtered
      .map(doc => {
        const recursos = doc.distribuciones
          .map(
            r => `
          <div class="doc-resource">
            <strong>${r.titulo}</strong><br>
            <span class="format">${r.formato}</span><br>
            <a href="${r.url}" target="_blank">Abrir recurso</a>
          </div>`
          )
          .join("");

        return `
        <div class="doc-card">
          <h3>${doc.descripcion}</h3>
          <p class="publisher"><strong>Publicador:</strong> ${doc.publisher}</p>
          <div class="resources">${recursos}</div>
        </div>`;
      })
      .join("");
  },

  /* ---------------------------------------------------------
     BUSCADOR
     --------------------------------------------------------- */
  attachSearch() {
    const input = document.querySelector("#docs-search");
    if (!input) return;

    input.addEventListener("input", e => {
      const q = e.target.value.toLowerCase();

      this.filtered = this.data.filter(doc => {
        const text =
          doc.descripcion.toLowerCase() +
          " " +
          doc.publisher.toLowerCase() +
          " " +
          doc.distribuciones.map(d => d.titulo.toLowerCase()).join(" ");

        return text.includes(q);
      });

      this.renderList();
    });
  }
};

document.addEventListener("DOMContentLoaded", () => DocumentosPRO.init());
