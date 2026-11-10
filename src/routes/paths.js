// ==========================================================
// RUTAS DEL SISTEMA
// Se definen una sola vez aquí. El AppRouter y el Navbar las
// importan, así los enlaces nunca quedan desalineados.
// ==========================================================

export const PATHS = {
  // Acceso al sistema
  INICIO: "/",
  LOGIN: "/login",
  REGISTRO: "/registro",

  // Perfil
  PERFIL: "/perfil",

  // Servicios
  SERVICIOS: "/servicios",
  SERVICIO_CREAR: "/servicios/crear",
  SERVICIO_DETALLE: "/servicios/:id",
  SERVICIO_EDITAR: "/servicios/:id/editar",

  // Servicios adicionales
  ADICIONALES: "/adicionales",
  ADICIONAL_CREAR: "/adicionales/crear",
  ADICIONAL_DETALLE: "/adicionales/:id",
  ADICIONAL_EDITAR: "/adicionales/:id/editar",

  // Empleados
  EMPLEADOS: "/empleados",
  EMPLEADO_CREAR: "/empleados/crear",
  EMPLEADO_DETALLE: "/empleados/:id",
  EMPLEADO_EDITAR: "/empleados/:id/editar",
  EMPLEADO_SERVICIOS: "/empleados/:id/servicios",

  // Horarios de atención
  HORARIOS: "/horarios",

  // Restricciones de horario
  RESTRICCIONES: "/restricciones",
  RESTRICCION_DETALLE: "/restricciones/:id",

  // Citas
  CITAS: "/citas",
  CITA_CREAR: "/citas/crear",
  CITA_DETALLE: "/citas/:id",
  CITA_EDITAR: "/citas/:id/editar",

  // Agenda diaria del establecimiento
  AGENDA: "/agenda",

  // Cualquier ruta que no exista
  NO_ENCONTRADA: "*",
};

// Arma una ruta con parámetros reales.
// Ejemplo: construirRuta(PATHS.SERVICIO_DETALLE, { id: 5 }) -> "/servicios/5"
export function construirRuta(ruta, parametros = {}) {
  return Object.entries(parametros).reduce(
    (resultado, [clave, valor]) => resultado.replace(`:${clave}`, valor),
    ruta
  );
}
