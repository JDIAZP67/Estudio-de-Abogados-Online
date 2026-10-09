# LexOnline — Consultora Legal y Cursos

Sitio web estático del estudio jurídico virtual **LexOnline** (proyecto de Verval SAC): consultoría jurídica por videollamada con abogados colegiados y academia legal con cursos certificables.

## Cómo ver el sitio

Opción 1 — abrir directamente `index.html` en el navegador (no requiere servidor).

Opción 2 — servidor local:

```bash
python3 -m http.server 8080
# luego abrir http://localhost:8080
```

## Estructura del proyecto

```
index.html              Página principal (SPA estática)
css/estilos.css         Estilos del sitio
js/datos.js             Modelo de datos: catálogo completo (LEX)
js/main.js              Render dinámico + interacción
img/                    Logo y flyer
docs/                   Documentación técnica del proyecto
```

## Documentación técnica

| Documento | Contenido |
|---|---|
| `docs/documento-canvas.html` | DC-01 · Modelo de Negocio Canvas (9 bloques de Osterwalder) |
| `docs/documento-procesos.html` | DP-01 · Mapa de procesos, fichas P01–P07 e indicadores |
| `docs/documento-funcional.html` | DF-01 · Modelo de datos vigente y guía operativa |

## Gestión de contenido

Todo el catálogo se administra desde un solo archivo: `js/datos.js`.

- **Abogados**: definidos una vez con `id`; especialidades y cursos los referencian (`abogadosIds`, `docenteId`).
- **Especialidades y cursos**: precios, duraciones, descripciones.
- **Pagos**: fase actual Yape/Plin/transferencia coordinada por WhatsApp; fase 2 con enlaces de pasarela en `LEX.pagos.enlacesOnline`.

El sitio incluye un validador automático (`LEX.validarLex()`): si hay ids duplicados, referencias rotas o precios inválidos, lo advierte en la consola del navegador sin romper la página.

## Tecnologías

HTML5 · CSS3 · JavaScript vanilla (sin frameworks ni dependencias) · Cal.com para agendamiento · Google Meet para videollamadas · WhatsApp como canal transaccional.

## Roadmap de pagos

1. **Fase 1 (activa)**: pago manual coordinado por WhatsApp tras confirmar cita o inscripción.
2. **Fase 2 (preparada)**: enlaces de pago de pasarela (Mercado Pago / Culqi / Izipay) registrados en `datos.js`.
3. **Fase 3 (futura)**: backend con persistencia de citas, alumnos y transacciones.

---

© 2026 Verval SAC — LexOnline. Proyecto académico/de desarrollo interno.
