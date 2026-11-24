import { BriefcaseBusiness, Clock, Pencil, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { obtenerServicio } from "@/api/servicios.service";
import { BotonVolver } from "@/components/common/BotonVolver";
import { DatoDetalle } from "@/components/common/DatoDetalle";
import { ImagenApi } from "@/components/common/ImagenApi";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { colones, duracion, fechaLarga, nombreCompleto } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";
import { ADMIN_Y_EMPLEADO, SOLO_ADMIN } from "@/routes/roles";

// ==========================================================
// DETALLE DEL SERVICIO  (GET /servicios/:id)
// ==========================================================
export default function ServicioDetallePage() {
  const { id } = useParams();
  const { rol } = useAuth();
  const esAdmin = SOLO_ADMIN.includes(rol);
  const puedeVerEmpleados = ADMIN_Y_EMPLEADO.includes(rol);

  const { datos: servicio, cargando, error, recargar } = useApi(() => obtenerServicio(id), [id]);

  return (
    <section>
      <PageHeader titulo={servicio?.nombre ?? "Detalle del servicio"} descripcion="Información completa del servicio.">
        <BotonVolver a={PATHS.SERVICIOS} />
        {esAdmin && servicio && (
          <Button asChild>
            <Link to={construirRuta(PATHS.SERVICIO_EDITAR, { id })}>
              <Pencil />
              Editar
            </Link>
          </Button>
        )}
      </PageHeader>

      <EstadoConsulta cargando={cargando} error={error} onReintentar={recargar}>
        {servicio && (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="overflow-hidden rounded-xl border bg-muted lg:col-span-2">
              <ImagenApi archivo={servicio.imagen} alt={servicio.nombre} className="aspect-video size-full object-cover lg:aspect-square" />
            </div>

            <div className="space-y-6 lg:col-span-3">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-bold">{colones(servicio.precioBase)}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="size-4" aria-hidden="true" />
                    {duracion(servicio.duracionMinutos)}
                  </span>
                  <EstadoBadge activo={servicio.activo} />
                </div>
                <p className="mb-5 text-muted-foreground">{servicio.descripcion}</p>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <DatoDetalle etiqueta="Especialidad">{servicio.especialidad?.nombre}</DatoDetalle>
                  <DatoDetalle etiqueta="Duración">{duracion(servicio.duracionMinutos)}</DatoDetalle>
                  <DatoDetalle etiqueta="Precio base">{colones(servicio.precioBase)}</DatoDetalle>
                  <DatoDetalle etiqueta="Registrado">{fechaLarga(servicio.creadoEn)}</DatoDetalle>
                  {esAdmin && (
                    <DatoDetalle etiqueta="Citas con este servicio">{servicio.citas?.length ?? 0}</DatoDetalle>
                  )}
                </dl>
              </div>

              {/* Empleados que realizan el servicio */}
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 font-semibold">
                  <Users className="size-5 text-primary" aria-hidden="true" />
                  Empleados que realizan este servicio
                </h2>
                {servicio.empleados?.length ? (
                  <ul className="divide-y">
                    {servicio.empleados.map((empleado) => (
                      <li key={empleado.id} className="flex items-center justify-between gap-3 py-2.5">
                        <div>
                          <p className="font-medium">{nombreCompleto(empleado.usuario)}</p>
                          <p className="text-xs text-muted-foreground">{empleado.codigoEmpleado}</p>
                        </div>
                        {puedeVerEmpleados && (
                          <Link
                            to={construirRuta(PATHS.EMPLEADO_DETALLE, { id: empleado.id })}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Ver
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BriefcaseBusiness className="size-4" aria-hidden="true" />
                    Todavía no hay empleados asignados a este servicio.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </EstadoConsulta>
    </section>
  );
}
