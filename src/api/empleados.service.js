import { apiClient, obtenerDatos } from "./client";

// GET /empleados  ->  empleados con usuario, especialidad, servicios y cantidad de citas
export async function obtenerEmpleados() {
  return obtenerDatos(await apiClient.get("/empleados"));
}

// GET /empleados/activos
export async function obtenerEmpleadosActivos() {
  return obtenerDatos(await apiClient.get("/empleados/activos"));
}

// GET /empleados/:id  ->  detalle con servicios, restricciones y citas
export async function obtenerEmpleado(id) {
  return obtenerDatos(await apiClient.get(`/empleados/${id}`));
}
