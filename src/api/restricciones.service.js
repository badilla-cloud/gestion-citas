import { apiClient, obtenerDatos } from "./client";

// GET /restricciones-horario  ->  restricciones con tipo y empleado (si aplica)
export async function obtenerRestricciones() {
  return obtenerDatos(await apiClient.get("/restricciones-horario"));
}

// GET /restricciones-horario/:id
export async function obtenerRestriccion(id) {
  return obtenerDatos(await apiClient.get(`/restricciones-horario/${id}`));
}
