PANEL DE MANTENIMIENTO - V&V CONSULTORES
=========================================

URL ONLINE (GitHub Pages + dominio):
  https://v-v-consultores.com/admin/
  o https://jdiazp67.github.io/Estudio-de-Abogados-Online/admin/

PRIMER INGRESO:
  1. Abrir /admin/login.html
  2. Crear clave única (mínimo 4 caracteres)
  3. Al GUARDAR por primera vez pedirá un GitHub PAT fine-grained
     (Solo necesita permiso: Contents → Write)

CREAR PAT FINE-GRAINED (recomendado):
  https://github.com/settings/tokens?type=beta
  - Repositorio: solo Estudio-de-Abogados-Online
  - Permisos: Repository permissions → Contents → Write
  - Duración sugerida: 90 días o No expiration (con cuidado)

FUNCIONAMIENTO:
  - Login: clave única (local/sessionStorage)
  - Escritura: GitHub Contents API → crea commits automáticos en main
  - Fotos/PDFs: subidos a /uploads/ (se guarda como Base64 + commit)
  - Todo queda versionado en GitHub

NOTAS:
  - Diseño NUNCA se modifica (index.html, css/estilos.css intactos)
  - El token se guarda solo en sessionStorage (se borra al cerrar pestaña)
  - Foto principal evento: Destacado + "Mostrar en Hero" en Configuración
