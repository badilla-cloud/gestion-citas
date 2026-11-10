import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { PATHS } from "./paths";

// ==========================================================
// RUTA PROTEGIDA
// - Si no hay sesión, envía al login.
// - Si hay sesión pero el rol no tiene permiso, envía al inicio.
// Así una página sin permiso no se puede abrir escribiendo la URL.
// ==========================================================
export function ProtectedRoute({ rolesPermitidos }) {
  const { autenticado, rol } = useAuth();

  if (!autenticado) {
    return <Navigate to={PATHS.LOGIN} replace />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
    return <Navigate to={PATHS.INICIO} replace />;
  }

  return <Outlet />;
}
