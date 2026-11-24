import axios from "axios";

// Instancia única de axios para consumir el API de citas.
// La dirección se toma del archivo .env (VITE_API_URL).
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

// Antes de cada petición se agrega el token JWT si el usuario ya inició sesión.
// El API lo espera en el encabezado "Authorization: Bearer <token>".
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// El API responde siempre { success, message, data }.
// Esta función devuelve solo "data" para que las páginas trabajen directo con los datos.
export function obtenerDatos(respuesta) {
  return respuesta.data.data;
}

// Convierte cualquier error de axios en un mensaje claro para mostrar en pantalla.
export function mensajeDeError(error) {
  if (error.response) {
    // El API respondió con un código de error (4XX o 5XX)
    if (error.response.status === 404) return "El registro solicitado no existe.";
    return error.response.data?.message ?? `Error ${error.response.status} del servidor.`;
  }
  if (error.request) {
    // La petición salió pero nadie respondió (API apagado o URL incorrecta)
    return "No se pudo conectar con el API. Verifique que el servidor esté en ejecución.";
  }
  return error.message;
}

// Dirección completa de una imagen guardada en el API.
// La base de datos guarda solo el nombre del archivo.
export function urlImagen(nombreArchivo) {
  return `${import.meta.env.VITE_API_URL}/images/${nombreArchivo || "image-not-found.jpg"}`;
}
