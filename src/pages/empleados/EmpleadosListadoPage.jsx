import { BriefcaseBusiness, CalendarCheck, Mail, Phone, Plus, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { obtenerEspecialidades } from "@/api/catalogos.service";
import { obtenerEmpleados } from "@/api/empleados.service";
import { CampoBusqueda, SelectFiltro } from "@/components/common/CampoBusqueda";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { nombreCompleto, normalizar } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";
import { SOLO_ADMIN } from "@/routes/roles";

// ==========================================================
// LISTADO DE EMPLEADOS  (GET /empleados y GET /especialidades)
// Solo el Administrador puede registrar empleados.
// ==========================================================
export default function EmpleadosListadoPage() {
  const { rol } = useAuth();
  const puedeCrear = SOLO_ADMIN.includes(rol);

  const { datos: empleados, cargando, error, recargar } = useApi(obtenerEmpleados);
  const { datos: especialidades } = useApi(obtenerEspecialidades);

  const [busqueda, setBusqueda] = useState("");
  const [especialidadId, setEspecialidadId] = useState("todas");
  const [estado, setEstado] = useState("todos");

  const filtrados = (empleados ?? []).filter((e) => {
    if (estado === "activos" && !e.activo) return false;
    if (estado === "inactivos" && e.activo) return false;
    if (especialidadId !== "todas" && e.especialidadId !== Number(especialidadId)) return false;
    const texto = `${nombreCompleto(e.usuario)} ${e.codigoEmpleado} ${e.usuario?.correo}`;
    return normalizar(texto).includes(normalizar(busqueda));
  });

  return (
    <section>
      <PageHeader titulo="Empleados" descripcion="Personal que atiende las citas del establecimiento.">
        {puedeCrear && (
          <Button asChild>
            <Link to={PATHS.EMPLEADO_CREAR}>
              <Plus />
              Nuevo empleado
            </Link>
          </Button>
        )}
      </PageHeader>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <CampoBusqueda valor={busqueda} onCambiar={setBusqueda} placeholder="Nombre, código o correo..." />
        <SelectFiltro
          etiqueta="Especialidad"
          valor={especialidadId}
          onCambiar={setEspecialidadId}
          opciones={[
            { valor: "todas", texto: "Todas las especialidades" },
            ...(especialidades ?? []).map((e) => ({ valor: String(e.id), texto: e.nombre })),
          ]}
        />
        <SelectFiltro
          etiqueta="Estado"
          valor={estado}
          onCambiar={setEstado}
          opciones={[
            { valor: "todos", texto: "Todos los estados" },
            { valor: "activos", texto: "Activos" },
            { valor: "inactivos", texto: "Inactivos" },
          ]}
        />
      </div>

      <EstadoConsulta
        cargando={cargando}
        error={error}
        onReintentar={recargar}
        vacio={filtrados.length === 0}
        icono={Users}
        tituloVacio={empleados?.length ? "Ningún empleado coincide con los filtros" : "No hay empleados registrados"}
        descripcionVacio="Los empleados que registre el administrador aparecerán aquí."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((empleado) => (
            <Link
              key={empleado.id}
              to={construirRuta(PATHS.EMPLEADO_DETALLE, { id: empleado.id })}
              className="flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
                  {empleado.usuario?.nombre?.[0]}
                  {empleado.usuario?.primerApellido?.[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold">{nombreCompleto(empleado.usuario)}</h2>
                  <p className="text-xs text-muted-foreground">
                    {empleado.codigoEmpleado} · {empleado.especialidad?.nombre}
                  </p>
                </div>
                <EstadoBadge activo={empleado.activo} />
              </div>

              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2 truncate">
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {empleado.usuario?.correo}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {empleado.usuario?.telefono || "Sin teléfono"}
                </li>
              </ul>

              <div className="mt-auto flex gap-4 border-t pt-3 text-sm">
                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness className="size-4 text-primary" aria-hidden="true" />
                  {empleado.servicios?.length ?? 0} servicios
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarCheck className="size-4 text-primary" aria-hidden="true" />
                  {empleado._count?.citas ?? 0} citas
                </span>
              </div>
            </Link>
          ))}
        </div>
      </EstadoConsulta>
    </section>
  );
}
