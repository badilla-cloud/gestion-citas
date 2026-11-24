# Gestión de Citas – FrontEnd (Avance 2)

Proyecto base con React (Vite), Tailwind CSS y shadcn/ui.

**Avance 1:** proyecto base funcionando con estructura de carpetas, Layout, Navbar, Footer y navegación entre páginas vacías.

**Avance 2:** todos los listados y detalles del sistema funcionando mediante GET, con estilos Tailwind, login básico y consulta de perfil.

### Qué se agregó en el Avance 2
- **Capa de servicios (`src/api/`)** que consume los endpoints GET del API: servicios, adicionales, empleados, horarios, restricciones, roles, especialidades, estados de cita, días de la semana y tipos de restricción.
- **Login real** (`POST /usuarios/login`): el token se guarda en `localStorage` y el interceptor de axios lo envía en cada petición. Se eliminó el usuario temporal del Avance 1.
- **Consulta de perfil** (`GET /usuarios/perfil`): al recargar la página la sesión se recupera validando el token.
- **Patrón carga / error / vacío** reutilizable: hook `useApi` + componente `EstadoConsulta` (Cargando, ErrorState con Reintentar y EmptyState).
- **Listados y detalles** de Servicios, Servicios adicionales, Empleados, Horarios de atención y Restricciones de horario, con búsqueda y filtros.
- **Responsive**: grids de 1/2/3 columnas, tablas que pasan a tarjetas o se desplazan en celular.
- Citas y Agenda siguen como páginas base: se desarrollan en los siguientes avances.

### Probar el login
Con el API recién inicializado existe el administrador del seed: `admin@citas.com` / `Admin12345`.

## Ejecutar
```bash
npm install
npm run dev
```
Abrir http://localhost:5173

El API de citas debe correr en http://localhost:3000 (se configura en `.env` con `VITE_API_URL`).

## Estructura de `src/`
| Carpeta | Contenido |
|---|---|
| `api/` | `client.js` (axios + token + manejo de errores) y un servicio por módulo con sus GET |
| `components/ui/` | Componentes de shadcn/ui |
| `components/layout/` | `MainLayout`, `Navbar`, `Footer` |
| `components/common/` | PageHeader, EmptyState, Cargando, ErrorState, EstadoConsulta, EstadoBadge, CampoBusqueda, DatoDetalle, ImagenApi, BotonVolver |
| `context/` | `AuthContext` (usuario y rol) |
| `hooks/` | `useApi` (patrón carga / error / vacío) |
| `lib/` | `utils.js` de shadcn y `formato.js` (colones, fechas, horas, nombres) |
| `pages/` | Una carpeta por módulo + `NotFound.jsx` |
| `routes/` | `paths.js` (todas las rutas), `roles.js`, `AppRouter.jsx`, `ProtectedRoute.jsx` |

## Notas
- Las rutas se definen una sola vez en `src/routes/paths.js`.
- Los permisos de cada ruta siguen la matriz de permisos del enunciado.
- `AuthContext` usa el login real del API; el rol que llega en el perfil decide el menú y los permisos.

## Integrantes (reparto del Avance 1)
- Alejandro Badilla: base técnica, estructura, rutas, Layout, AuthContext, ProtectedRoute, cliente del API y páginas de Acceso, Perfil, Servicios y Adicionales.
- Kenneth Hernández: Navbar, Footer, página 404, navLinks, componentes comunes y páginas de Empleados, Horarios, Restricciones, Citas y Agenda.
