import { BriefcaseBusiness, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { obtenerEspecialidades } from "@/api/catalogos.service";
import { obtenerServicios } from "@/api/servicios.service";
import { CampoBusqueda, SelectFiltro } from "@/components/common/CampoBusqueda";
import { ImagenApi } from "@/components/common/ImagenApi";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { colones, duracion, normalizar } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";
import { SOLO_ADMIN } from "@/routes/roles";

// ==========================================================
// LISTADO DE SERVICIOS  (GET /servicios y GET /especialidades)
// El Administrador ve todos (activos e inactivos);
// Empleado y Cliente solo ven los activos.
// ==========================================================
export default function ServiciosListadoPage() {
  const { rol } = useAuth();
  const esAdmin = SOLO_ADMIN.includes(rol);

  const { datos: servicios, cargando, error, recargar } = useApi(obtenerServicios);
  const { datos: especialidades } = useApi(obtenerEspecialidades);

  const [busqueda, setBusqueda] = useState("");
  const [especialidadId, setEspecialidadId] = useState("todas");
  const [estado, setEstado] = useState("todos");

  const filtrados = (servicios ?? []).filter((s) => {
    if (!esAdmin && !s.activo) return false;
    if (esAdmin && estado === "activos" && !s.activo) return false;
    if (esAdmin && estado === "inactivos" && s.activo) return false;
    if (especialidadId !== "todas" && s.especialidadId !== Number(especialidadId)) return false;
    return normalizar(`${s.nombre} ${s.descripcion}`).includes(normalizar(busqueda));
  });

  const opcionesEspecialidad = [
    { valor: "todas", texto: "Todas las especialidades" },
    ...(especialidades ?? []).map((e) => ({ valor: String(e.id), texto: e.nombre })),
  ];

  return (
    <section>
      <PageHeader titulo="Servicios" descripcion="Servicios que ofrece el establecimiento.">
        {esAdmin && (
          <Button asChild>
            <Link to={PATHS.SERVICIO_CREAR}>
              <Plus />
              Nuevo servicio
            </Link>
          </Button>
        )}
      </PageHeader>

      {/* Filtros */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <CampoBusqueda valor={busqueda} onCambiar={setBusqueda} placeholder="Buscar servicio..." />
        <SelectFiltro etiqueta="Especialidad" valor={especialidadId} onCambiar={setEspecialidadId} opciones={opcionesEspecialidad} />
        {esAdmin && (
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
        )}
      </div>

      <EstadoConsulta
        cargando={cargando}
        error={error}
        onReintentar={recargar}
        vacio={filtrados.length === 0}
        icono={BriefcaseBusiness}
        tituloVacio={servicios?.length ? "Ningún servicio coincide con los filtros" : "No hay servicios registrados"}
        descripcionVacio={servicios?.length ? "Pruebe con otra búsqueda o especialidad." : "Cuando el administrador registre servicios aparecerán aquí."}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((servicio) => (
            <Link
              key={servicio.id}
              to={construirRuta(PATHS.SERVICIO_DETALLE, { id: servicio.id })}
              className="group overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <ImagenApi archivo={servicio.imagen} alt={servicio.nombre} className="size-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold leading-tight">{servicio.nombre}</h2>
                  {esAdmin && <EstadoBadge activo={servicio.activo} />}
                </div>
                <p className="text-xs font-medium text-primary">{servicio.especialidad?.nombre}</p>
                <p className="line-clamp-2 text-sm text-muted-foreground">{servicio.descripcion}</p>
                <div className="flex items-center justify-between pt-2 text-sm">
                  <span className="text-lg font-semibold">{colones(servicio.precioBase)}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-4" aria-hidden="true" />
                    {duracion(servicio.duracionMinutos)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </EstadoConsulta>
    </section>
  );
}
