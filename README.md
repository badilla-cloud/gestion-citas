# Gestión de Citas – FrontEnd (Avance 1)

Proyecto base con React (Vite), Tailwind CSS y shadcn/ui.

**Avance 1:** proyecto base funcionando con estructura de carpetas, Layout, Navbar, Footer y navegación entre páginas vacías.

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
| `api/` | `client.js` (instancia de axios con el token) y un servicio vacío por módulo |
| `components/ui/` | Componentes de shadcn/ui |
| `components/layout/` | `MainLayout`, `Navbar`, `Footer` |
| `components/common/` | Componentes reutilizables (PageHeader, EmptyState…) |
| `context/` | `AuthContext` (usuario y rol) |
| `hooks/` | Hooks personalizados |
| `lib/` | `utils.js` de shadcn |
| `pages/` | Una carpeta por módulo + `NotFound.jsx` |
| `routes/` | `paths.js` (todas las rutas), `roles.js`, `AppRouter.jsx`, `ProtectedRoute.jsx` |

## Notas
- Las rutas se definen una sola vez en `src/routes/paths.js`.
- Los permisos de cada ruta siguen la matriz de permisos del enunciado.
- `AuthContext` usa un **usuario temporal** para probar el menú por rol. Se reemplaza por el login real contra el API en el Avance 2.

## Integrantes
- Alejandro Badilla: base técnica, estructura, rutas, Layout, AuthContext, ProtectedRoute, cliente del API y páginas de Acceso, Perfil, Servicios y Adicionales.
- Kenneth Hernández: Navbar, Footer, página 404, navLinks, componentes comunes y páginas de Empleados, Horarios, Restricciones, Citas y Agenda.
