import { apiClient, obtenerDatos } from "./client";

// GET /servicios-adicionales
export async function obtenerAdicionales() {
  return obtenerDatos(await apiClient.get("/servicios-adicionales"));
}

// GET /servicios-adicionales/activos
export async function obtenerAdicionalesActivos() {
  return obtenerDatos(await apiClient.get("/servicios-adicionales/activos"));
}

// GET /servicios-adicionales/:id
export async function obtenerAdicional(id) {
  return obtenerDatos(await apiClient.get(`/servicios-adicionales/${id}`));
}
