import { createContext, useContext, useEffect, useState } from "react";

import { iniciarSesion as loginApi, obtenerPerfil } from "@/api/usuarios.service";

// ==========================================================
// CONTEXTO DE AUTENTICACIÓN
// Guarda el usuario que inició sesión y su rol para que
// cualquier componente (Navbar, rutas protegidas) lo consulte.
//
// Avance 2: ya no usa un usuario temporal. El login se hace
// contra el API (POST /usuarios/login), el token se guarda en
// localStorage y los datos del usuario se consultan con
// GET /usuarios/perfil.
// ==========================================================

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  // Si hay un token guardado, al abrir la app hay que validarlo con el API
  const [cargando, setCargando] = useState(() => Boolean(localStorage.getItem("token")));

  // Al recargar la página: si existe un token, se recupera el perfil.
  // Si el token venció o no es válido, se elimina y queda sin sesión.
  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    obtenerPerfil()
      .then((perfil) => setUsuario(perfil))
      .catch(() => {
        localStorage.removeItem("token");
        setUsuario(null);
      })
      .finally(() => setCargando(false));
  }, []);

  // 1) POST /usuarios/login -> token  2) se guarda  3) GET /usuarios/perfil
  async function iniciarSesion(correo, password) {
    const { token } = await loginApi(correo, password);
    localStorage.setItem("token", token);
    try {
      const perfil = await obtenerPerfil();
      setUsuario(perfil);
      return perfil;
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  }

  function cerrarSesion() {
    localStorage.removeItem("token");
    setUsuario(null);
  }

  const valor = {
    usuario,
    rol: usuario?.rol?.nombre ?? null, // "Administrador", "Empleado" o "Cliente" (viene del API)
    autenticado: usuario !== null,
    cargando,
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
