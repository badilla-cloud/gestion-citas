import { createContext, useContext, useState } from "react";

import { ROLES } from "@/routes/roles";

// ==========================================================
// CONTEXTO DE AUTENTICACIÓN
// Guarda el usuario que inició sesión y su rol para que
// cualquier componente (Navbar, rutas protegidas) lo consulte.
// ==========================================================

// TODO (Avance 2): USUARIO TEMPORAL SOLO PARA PROBAR EL MENÚ POR ROL.
// El enunciado prohíbe simular datos, así que esto se reemplaza por el
// login real contra el API (POST /usuarios/login y GET /usuarios/perfil).
// Para probar otro rol, cambie ROLES.ADMIN por ROLES.EMPLEADO o ROLES.CLIENTE.
const USUARIO_TEMPORAL = {
  nombre: "Usuario de prueba",
  correo: "prueba@citas.com",
  rol: ROLES.ADMIN,
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(USUARIO_TEMPORAL);

  // Esqueletos: en el siguiente avance llamarán al API
  function iniciarSesion(datosUsuario) {
    setUsuario(datosUsuario);
  }

  function cerrarSesion() {
    localStorage.removeItem("token");
    setUsuario(null);
  }

  const valor = {
    usuario,
    rol: usuario?.rol ?? null,
    autenticado: usuario !== null,
    iniciarSesion,
    cerrarSesion,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

// Hook para usar el contexto: const { usuario, rol } = useAuth();
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return contexto;
}
