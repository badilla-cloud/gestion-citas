import { Navigate, Outlet, useLocation } from "react-router-dom";

import { Cargando } from "@/components/common/Cargando";
import { useAuth } from "@/context/AuthContext";
import { PATHS } from "./paths";

// ==========================================================
// RUTA PROTEGIDA
// - Mientras se valida el token guardado, muestra "Cargando".
// - Si no hay sesión, envía al login (y recuerda a dónde quería ir).
// - Si hay sesión pero el rol no tiene permiso, envía al inicio.
// Así una página sin permiso no se puede abrir escribiendo la URL.
// ==========================================================
export function ProtectedRoute({ rolesPermitidos }) {
  const { autenticado, rol, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return <Cargando mensaje="Verificando sesión..." />;
  }

  if (!autenticado) {
    return <Navigate to={PATHS.LOGIN} replace state={{ desde: location.pathname }} />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
    return <Navigate to={PATHS.INICIO} replace />;
  }

  return <Outlet />;
}
