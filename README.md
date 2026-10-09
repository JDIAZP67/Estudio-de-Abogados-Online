# V&V Consultores

Sitio web corporativo para estudio jurídico V&V Consultores (`https://v-v-consultores.com/`). Página estática (HTML, CSS y JavaScript vanilla), preparada para GitHub Pages y con capa de contenido en JSON + panel de administración con clave de acceso.

## Estructura

```text
/
├── index.html
├── css/estilos.css
├── js/
│   ├── datos.js
│   ├── main.js
│   ├── data-loader.js
│   ├── render.js
│   └── schema.js
├── data/                # Contenido editable (JSON)
├── uploads/             # Archivos multimedia (fotos, PDFs)
├── admin/               # Panel de mantenimiento (protegido)
├── docs/                # Documentación técnica
├── img/                 # Imágenes de marca
└── referencias-imagenes/ # Material de referencia (no versionado pesado)
```

## Desarrollo local

```bash
cd "/home/juliodiazprado/Documentos/ANALISIS Y DISENO EN SISTEMAS - DESARROLLO/CONSULTORIA-LEGAL-DIGITAL/Estudio-de-Abogados-Online"
python3 -m http.server 8000
# Abrir http://localhost:8000
```

## Contenido y mantenimiento

Todo el contenido se gestiona desde `/admin/` con clave de acceso para el encargado. La foto principal de eventos se controla desde Eventos (`destacado`) y puede mostrarse en Hero desde Configuración.

## Despliegue

GitHub Pages. Dominio: `v-v-consultores.com` (CNAME). Cada cambio publicado genera un commit automático desde el panel de administración.

## Notas

- Las imágenes se comprimen a WebP/JPEG antes de subirse.
- Mientras no supere 50–100 MB/mes de media, se mantiene en `/uploads/` dentro del repo.
- El video pesado no se versiona (ver `.gitignore`).
