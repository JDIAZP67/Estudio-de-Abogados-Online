PANEL DE MANTENIMIENTO - V&V CONSULTORES
=========================================

URL LOCAL (desarrollo):
  http://localhost:3001/admin/login.html

PRIMER INGRESO:
  1. Abrir /admin/login.html
  2. Crear clave única (mínimo 4 caracteres)
  3. Entrará automáticamente al panel

LOGIN POSTERIOR:
  1. Ingresar con la clave creada
  2. Acceso al panel con todas las secciones

SECCIONES DISPONIBLES:
  - Configuración: Marca, contacto, SEO, Hero, mostrar evento destacado, cambio de clave
  - Servicios: Agregar/Eliminar
  - Abogados: Agregar/Eliminar (foto, bio, orden)
  - Cursos: Agregar/Eliminar (portada, docente, precio)
  - Eventos: Agregar/Eliminar (Foto principal + Destacado - solo 1)
  - Galería: Subir/Eliminar imágenes (a uploads/galeria/)
  - Documentos: Subir/Eliminar PDFs/DOCX (a uploads/documentos/)
  - Testimonios: Agregar/Eliminar
  - Ayuda

NOTAS IMPORTANTES:
  - Diseño NUNCA se modifica (index.html, css/estilos.css intactos)
  - Todo se guarda en /data/*.json y /uploads/
  - Foto principal de evento: marcar Destacado. Activar "Mostrar en Hero" en Configuración
  - Al guardar se persisten los cambios en los archivos JSON
