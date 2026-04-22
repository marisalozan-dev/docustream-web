# 🚀 DocuStream — Documentación Técnica Inteligente  
### Intelligent Technical Documentation

Transforming complex documentation into **structured, visual and actionable knowledge**.

---

<style>
/* CONTENEDOR DE PESTAÑAS */
.tab-container {
  display: flex;
  border-bottom: 2px solid #ddd;
  margin-bottom: 20px;
}

/* BOTONES DE PESTAÑA */
.tab {
  padding: 10px 18px;
  cursor: pointer;
  font-weight: 600;
  border: 1px solid #ddd;
  border-bottom: none;
  background: #f7f7f7;
  margin-right: 5px;
  border-radius: 6px 6px 0 0;
}

.tab.active {
  background: #ffffff;
  border-bottom: 2px solid white;
}

/* CONTENIDO */
.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}
</style>

<div class="tab-container">
  <div class="tab active" onclick="showTab('es')">🇪🇸 Español</div>
  <div class="tab" onclick="showTab('en')">🇬🇧 English</div>
</div>

<script>
function showTab(lang) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  document.querySelector('.tab[onclick="showTab(\''+lang+'\')"]').classList.add('active');
  document.getElementById(lang).classList.add('active');
}
</script>

---

<div id="es" class="tab-content active">

# 🇪🇸 Español

## 🧠 ¿Qué es DocuStream?

DocuStream es un prototipo conceptual que demuestra cómo la documentación técnica puede transformarse en:

- Grafos semánticos  
- Insights automatizados  
- Capas visuales interactivas  
- Workflows documentales inteligentes  

Diseñado como proyecto de portfolio por **Marisa Lozano Arroyo**, combinando:

- Documentación técnica  
- Analítica de datos  
- Arquitectura de la información  
- Innovación y deeptech  

---

## ✨ Funcionalidades principales

### 🔍 Procesamiento inteligente  
Extracción automática de entidades, relaciones y metadatos.

### 🧩 Grafos semánticos  
Representación visual de la estructura y significado documental.

### 📊 Visualización avanzada  
Diagramas interactivos, nodos dinámicos y flujos animados.

### ⚙️ Automatización  
Workflows documentales, clasificación y enriquecimiento.

---

## 🖥️ Demo en vivo

### ▶️ **Demo PRO interactiva**  
Explora el grafo dinámico con zoom, pan y movimiento en tiempo real:

👉 `docustream-pro.html`

Incluye:
- Nodos dinámicos  
- Conexiones inteligentes  
- Zoom y pan  
- Modo oscuro  
- Reinicio y aleatorización  

---

## 🎨 UI & UX

La interfaz incluye:

- Diseño responsive  
- Hero premium  
- Menú móvil con overlay  
- Animaciones GSAP  
- Scroll reveal  
- Modo oscuro persistente  
- Identidad visual moderna  

---

## 📁 Estructura del proyecto

docustream-web/
│ index.html
│ index-en.html
│ style.css
│ style-en.css
│ style-pro.css
│ js-en.js
│ README.md
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/
│   │   ├── logo-light.svg
│   │   └── hero-visual.svg
│   └── js/
│       └── pro.js

---

## 🛠️ Tecnologías

- **HTML5 + CSS3 + JavaScript**
- **GSAP** (animaciones)
- **Canvas API** (demo PRO)
- **Responsive design**
- **Dark mode persistente**
- **Accesibilidad y estructura semántica**

---

## 👩‍💻 Sobre la autora

**Marisa Lozano Arroyo**  
Documentalista técnica y archivera (20+ años)  
En transición hacia **Data Analytics, Big Data e Innovación**

Enfoque en:
- Arquitectura de la información  
- Workflows data‑driven  
- Ecosistemas deeptech  
- Calidad documental  
- Representación visual del conocimiento  

---

## 📬 Contacto

**LinkedIn:**  
https://www.linkedin.com/in/marisalozanoarroyo/

---

## 📄 Licencia

Proyecto de portfolio. No destinado a uso comercial.

</div>

---

<div id="en" class="tab-content">

# 🇬🇧 English

## 🧠 What is DocuStream?

DocuStream is a conceptual prototype showing how technical documentation can evolve into:

- Semantic knowledge graphs  
- Automated insights  
- Interactive visual layers  
- Smart documentation workflows  

Designed as a portfolio project by **Marisa Lozano Arroyo**, combining:

- Technical documentation  
- Data analytics  
- Information architecture  
- Innovation & deeptech  

---

## ✨ Key Features

### 🔍 Intelligent Processing  
Automatic extraction of entities, relationships and metadata.

### 🧩 Semantic Graphs  
Visual representation of document structure and meaning.

### 📊 Advanced Visualization  
Interactive diagrams, dynamic nodes and animated flows.

### ⚙️ Automation  
Documentation workflows, classification and enrichment.

---

## 🖥️ Live Demo

### ▶️ **PRO Interactive Demo**  
Explore the dynamic node graph with zoom, pan and real‑time movement:

👉 `docustream-pro.html`

Includes:
- Dynamic nodes  
- Intelligent connections  
- Zoom & pan  
- Dark mode  
- Reset & random generation  

---

## 🎨 UI & UX

The interface includes:

- Responsive layout  
- Premium hero section  
- Mobile menu with overlay  
- GSAP animations  
- Scroll reveal  
- Persistent dark mode  
- Clean, modern visual identity  

---

## 📁 Project Structure

docustream-web/
│ index.html
│ index-en.html
│ style.css
│ style-en.css
│ style-pro.css
│ js-en.js
│ README.md
│
├── js/
│   └── script.js
│
├── assets/
│   ├── images/
│   │   ├── logo-light.svg
│   │   └── hero-visual.svg
│   └── js/
│       └── pro.js

---

## 🛠️ Technologies Used

- **HTML5 + CSS3 + JavaScript**
- **GSAP** (animations)
- **Canvas API** (PRO demo)
- **Responsive design**
- **Persistent dark mode**
- **Semantic structure & accessibility**

---

## 👩‍💻 About the Author

**Marisa Lozano Arroyo**  
Technical Documentalist & Archivist (20+ years)  
Transitioning into **Data Analytics, Big Data & Innovation**

Focused on:
- Information architecture  
- Data‑driven workflows  
- Deeptech & innovation ecosystems  
- Documentation quality  
- Visual knowledge representation  

---

## 📬 Contact

**LinkedIn:**  
https://www.linkedin.com/in/marisalozanoarroyo/

---

## 📄 License

This project is part of a personal portfolio and is not intended for commercial use.

</div>




