import { Route, Routes } from "react-router-dom";

import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { PATHS } from "./paths";
import { ADMIN_Y_EMPLEADO, SOLO_ADMIN, TODOS } from "./roles";

// Acceso
import InicioPage from "@/pages/auth/InicioPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegistroPage from "@/pages/auth/RegistroPage";
// Perfil
import PerfilPage from "@/pages/perfil/PerfilPage";
// Servicios
import ServiciosListadoPage from "@/pages/servicios/ServiciosListadoPage";
import ServicioDetallePage from "@/pages/servicios/ServicioDetallePage";
import ServicioCrearPage from "@/pages/servicios/ServicioCrearPage";
import ServicioEditarPage from "@/pages/servicios/ServicioEditarPage";
// Adicionales
import AdicionalesListadoPage from "@/pages/adicionales/AdicionalesListadoPage";
import AdicionalDetallePage from "@/pages/adicionales/AdicionalDetallePage";
import AdicionalCrearPage from "@/pages/adicionales/AdicionalCrearPage";
import AdicionalEditarPage from "@/pages/adicionales/AdicionalEditarPage";
// Empleados
import EmpleadosListadoPage from "@/pages/empleados/EmpleadosListadoPage";
import EmpleadoDetallePage from "@/pages/empleados/EmpleadoDetallePage";
import EmpleadoCrearPage from "@/pages/empleados/EmpleadoCrearPage";
import EmpleadoEditarPage from "@/pages/empleados/EmpleadoEditarPage";
import EmpleadoServiciosPage from "@/pages/empleados/EmpleadoServiciosPage";
// Horarios y restricciones
import HorariosListadoPage from "@/pages/horarios/HorariosListadoPage";
import RestriccionesListadoPage from "@/pages/restricciones/RestriccionesListadoPage";
import RestriccionDetallePage from "@/pages/restricciones/RestriccionDetallePage";
// Citas y agenda
import CitasListadoPage from "@/pages/citas/CitasListadoPage";
import CitaDetallePage from "@/pages/citas/CitaDetallePage";
import CitaCrearPage from "@/pages/citas/CitaCrearPage";
import CitaEditarPage from "@/pages/citas/CitaEditarPage";
import AgendaDiariaPage from "@/pages/agenda/AgendaDiariaPage";
// 404
import NotFound from "@/pages/NotFound";

// ==========================================================
// ENRUTADOR PRINCIPAL
// Todas las páginas usan el MainLayout. Las rutas protegidas
// indican qué roles pueden entrar, según la matriz de permisos
// del enunciado (páginas 20 y 21).
// ==========================================================
export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Públicas */}
        <Route path={PATHS.INICIO} element={<InicioPage />} />
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.REGISTRO} element={<RegistroPage />} />

        {/* Los tres roles */}
        <Route element={<ProtectedRoute rolesPermitidos={TODOS} />}>
          <Route path={PATHS.PERFIL} element={<PerfilPage />} />
          <Route path={PATHS.SERVICIOS} element={<ServiciosListadoPage />} />
          <Route path={PATHS.SERVICIO_DETALLE} element={<ServicioDetallePage />} />
          <Route path={PATHS.ADICIONALES} element={<AdicionalesListadoPage />} />
          <Route path={PATHS.ADICIONAL_DETALLE} element={<AdicionalDetallePage />} />
          <Route path={PATHS.HORARIOS} element={<HorariosListadoPage />} />
          <Route path={PATHS.CITAS} element={<CitasListadoPage />} />
          <Route path={PATHS.CITA_DETALLE} element={<CitaDetallePage />} />
        </Route>

        {/* Administrador y Empleado */}
        <Route element={<ProtectedRoute rolesPermitidos={ADMIN_Y_EMPLEADO} />}>
          <Route path={PATHS.EMPLEADOS} element={<EmpleadosListadoPage />} />
          <Route path={PATHS.EMPLEADO_DETALLE} element={<EmpleadoDetallePage />} />
          <Route path={PATHS.RESTRICCIONES} element={<RestriccionesListadoPage />} />
          <Route path={PATHS.RESTRICCION_DETALLE} element={<RestriccionDetallePage />} />
          <Route path={PATHS.CITA_CREAR} element={<CitaCrearPage />} />
          <Route path={PATHS.CITA_EDITAR} element={<CitaEditarPage />} />
        </Route>

        {/* Solo Administrador */}
        <Route element={<ProtectedRoute rolesPermitidos={SOLO_ADMIN} />}>
          <Route path={PATHS.SERVICIO_CREAR} element={<ServicioCrearPage />} />
          <Route path={PATHS.SERVICIO_EDITAR} element={<ServicioEditarPage />} />
          <Route path={PATHS.ADICIONAL_CREAR} element={<AdicionalCrearPage />} />
          <Route path={PATHS.ADICIONAL_EDITAR} element={<AdicionalEditarPage />} />
          <Route path={PATHS.EMPLEADO_CREAR} element={<EmpleadoCrearPage />} />
          <Route path={PATHS.EMPLEADO_EDITAR} element={<EmpleadoEditarPage />} />
          <Route path={PATHS.EMPLEADO_SERVICIOS} element={<EmpleadoServiciosPage />} />
          <Route path={PATHS.AGENDA} element={<AgendaDiariaPage />} />
        </Route>

        {/* Cualquier otra dirección */}
        <Route path={PATHS.NO_ENCONTRADA} element={<NotFound />} />
      </Route>
    </Routes>
  );
}
