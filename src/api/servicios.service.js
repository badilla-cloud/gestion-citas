import { apiClient, obtenerDatos } from "./client";

// GET /servicios  ->  todos los servicios con su especialidad y empleados
export async function obtenerServicios() {
  return obtenerDatos(await apiClient.get("/servicios"));
}

// GET /servicios/activos  ->  solo los activos (para el formulario de citas)
export async function obtenerServiciosActivos() {
  return obtenerDatos(await apiClient.get("/servicios/activos"));
}

// GET /servicios/:id  ->  detalle del servicio
export async function obtenerServicio(id) {
  return obtenerDatos(await apiClient.get(`/servicios/${id}`));
}
