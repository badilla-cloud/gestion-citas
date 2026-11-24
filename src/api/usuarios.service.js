import { apiClient, obtenerDatos } from "./client";

// ==========================================================
// SERVICIO DE USUARIOS (autenticación y perfil)
// ==========================================================

// POST /usuarios/login  ->  { token }
export async function iniciarSesion(correo, password) {
  const respuesta = await apiClient.post("/usuarios/login", { correo, password });
  return obtenerDatos(respuesta);
}

// GET /usuarios/perfil  (requiere token)  ->  usuario con su rol y empleado
export async function obtenerPerfil() {
  const respuesta = await apiClient.get("/usuarios/perfil");
  return obtenerDatos(respuesta);
}

// GET /usuarios?rol=Cliente  ->  lista de usuarios (se usará en los siguientes avances)
export async function obtenerUsuarios(rol) {
  const respuesta = await apiClient.get("/usuarios", { params: rol ? { rol } : {} });
  return obtenerDatos(respuesta);
}
