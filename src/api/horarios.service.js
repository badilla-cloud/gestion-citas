import { apiClient, obtenerDatos } from "./client";

// GET /horarios-atencion  ->  horarios con su día de la semana (horas en formato "HH:mm")
export async function obtenerHorarios() {
  return obtenerDatos(await apiClient.get("/horarios-atencion"));
}

// GET /horarios-atencion/:id
export async function obtenerHorario(id) {
  return obtenerDatos(await apiClient.get(`/horarios-atencion/${id}`));
}
