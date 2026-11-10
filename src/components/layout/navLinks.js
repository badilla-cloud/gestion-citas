import {
  Ban,
  BriefcaseBusiness,
  CalendarCheck,
  CalendarDays,
  Clock,
  Sparkles,
  Users,
} from "lucide-react";

import { PATHS } from "@/routes/paths";
import { ADMIN_Y_EMPLEADO, SOLO_ADMIN, TODOS } from "@/routes/roles";

// ==========================================================
// ENLACES DEL MENÚ DE NAVEGACIÓN
// Cada enlace indica qué roles pueden verlo, siguiendo la
// matriz de permisos del enunciado (páginas 20 y 21).
// Los roles coinciden con los de AppRouter.jsx, así el menú
// nunca muestra una página a la que el rol no puede entrar.
// ==========================================================
export const NAV_LINKS = [
  { etiqueta: "Citas", ruta: PATHS.CITAS, icono: CalendarCheck, roles: TODOS },
  { etiqueta: "Servicios", ruta: PATHS.SERVICIOS, icono: BriefcaseBusiness, roles: TODOS },
  { etiqueta: "Adicionales", ruta: PATHS.ADICIONALES, icono: Sparkles, roles: TODOS },
  { etiqueta: "Horarios", ruta: PATHS.HORARIOS, icono: Clock, roles: TODOS },
  { etiqueta: "Empleados", ruta: PATHS.EMPLEADOS, icono: Users, roles: ADMIN_Y_EMPLEADO },
  { etiqueta: "Restricciones", ruta: PATHS.RESTRICCIONES, icono: Ban, roles: ADMIN_Y_EMPLEADO },
  { etiqueta: "Agenda diaria", ruta: PATHS.AGENDA, icono: CalendarDays, roles: SOLO_ADMIN },
];

// Devuelve solo los enlaces que el rol actual puede ver.
// Sin sesión (rol null) no se muestra ningún enlace privado.
export function obtenerLinksPorRol(rol) {
  if (!rol) return [];
  return NAV_LINKS.filter((link) => link.roles.includes(rol));
}
