import { apiClient, obtenerDatos } from "./client";

// ==========================================================
// CATÁLOGOS DE SOLO LECTURA
// Los datos se obtienen directamente del API, nunca se escriben a mano.
// ==========================================================

// GET /roles
export async function obtenerRoles() {
  return obtenerDatos(await apiClient.get("/roles"));
}

// GET /especialidades
export async function obtenerEspecialidades() {
  return obtenerDatos(await apiClient.get("/especialidades"));
}

// GET /estados-cita
export async function obtenerEstadosCita() {
  return obtenerDatos(await apiClient.get("/estados-cita"));
}

// GET /dias-semana
export async function obtenerDiasSemana() {
  return obtenerDatos(await apiClient.get("/dias-semana"));
}

// GET /tipos-restriccion-horario
export async function obtenerTiposRestriccion() {
  return obtenerDatos(await apiClient.get("/tipos-restriccion-horario"));
}
