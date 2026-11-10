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
