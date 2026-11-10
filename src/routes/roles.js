// Nombres de los roles tal como los devuelve el API (rol.nombre)
export const ROLES = {
  ADMIN: "Administrador",
  EMPLEADO: "Empleado",
  CLIENTE: "Cliente",
};

// Grupos de roles que se repiten en la matriz de permisos del enunciado
export const TODOS = [ROLES.ADMIN, ROLES.EMPLEADO, ROLES.CLIENTE];
export const ADMIN_Y_EMPLEADO = [ROLES.ADMIN, ROLES.EMPLEADO];
export const SOLO_ADMIN = [ROLES.ADMIN];
