DocuStream PRO
Sistema de inteligencia documental en tiempo real — proyecto conceptual que demuestra cómo la gestión documental empresarial puede evolucionar cuando se integra con Big Data, grafos semánticos y análisis de comportamiento lector.

🔗 Ver web en vivo · Demo interactiva · Dossier técnico · Sobre la autora


El problema que resuelve
Las organizaciones generan miles de documentos que envejecen silenciosamente. Nadie sabe cuándo quedan obsoletos, qué secciones confunden a los lectores o qué conocimiento crítico se pierde entre versiones. Las herramientas actuales (Confluence, Notion, SharePoint) almacenan documentos — pero no los entienden.

DocuStream PRO propone convertir esa documentación estática en un sistema vivo, impulsado por datos reales.


Arquitectura conceptual
[Fuentes documentales]

 Confluence · Notion · SharePoint · Google Drive · GitHub

        │

        ▼

[Capa de ingesta — APIs REST + Webhooks]

        │

        ▼

[Apache Kafka — Event Streaming]

 Lecturas · Ediciones · Búsquedas · Versiones

        │

        ▼

[Apache Spark Streaming — Procesamiento]

        │

 ┌──────┴──────────────┬─────────────────┐

 ▼                     ▼                 ▼

[Data Lake]      [Modelos ML]     [Grafo semántico]

 S3 / BigQuery    Obsolescencia    Neo4j / Neptune

        │

        ▼

[API REST — FastAPI]

        │

        ▼

[Frontend — React / Next.js]

 Dashboard · Heatmaps · Alertas · Grafo visual


Módulos principales
1 · Obsolescencia predictiva
Predice cuándo un documento quedará desactualizado antes de que ocurra. Combina historial de ediciones, patrones de uso real y señales de sistemas externos. Modelos utilizados: Cox Proportional Hazards, Random Forest, XGBoost. Datasets de referencia: Wikipedia Revision History, StackOverflow, ArXiv.
2 · Grafo de conocimiento semántico
Mapea relaciones entre documentos, APIs, procesos y normativas usando embeddings (sentence-transformers, OpenAI) y Neo4j AuraDB. Cuando un documento cambia, el grafo propaga sugerencias de revisión a todos los documentos relacionados.
3 · Analítica del lector
Captura scroll depth, tiempo por párrafo, búsquedas fallidas y abandonos para identificar zonas confusas y lagunas de contenido. Sin tracking individual — agregado y anonimizado por defecto.


Stack tecnológico
Capa
Tecnologías
Ingesta
Apache Kafka, REST APIs, Webhooks
Procesamiento
Apache Spark Streaming, Python
Almacenamiento
AWS S3, BigQuery, PostgreSQL
Inteligencia
Neo4j AuraDB, sentence-transformers, XGBoost
Backend
FastAPI
Frontend
React / Next.js, HTML5, CSS3



Sobre la autora
Proyecto desarrollado por Marisa Lozano Arroyo — Documentalista con más de 20 años de experiencia en gestión documental (Tribunal de Cuentas, Ministerio para la Transición Ecológica, SAREB) y actualmente cursando un Máster en Big Data & Business Intelligence.

DocuStream PRO nació de una pregunta real: ¿qué pasaría si la documentación empresarial supiera cuándo está envejeciendo?

🔗 LinkedIn · Web del proyecto



© 2026 Marisa Lozano Arroyo · Proyecto conceptual con fines de demostración profesional
