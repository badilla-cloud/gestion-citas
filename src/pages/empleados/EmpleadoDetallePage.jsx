import { Ban, BriefcaseBusiness, CalendarCheck, Pencil, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { obtenerEmpleado } from "@/api/empleados.service";
import { BotonVolver } from "@/components/common/BotonVolver";
import { DatoDetalle } from "@/components/common/DatoDetalle";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { colones, duracion, fechaLarga, hora12, nombreCompleto } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";
import { SOLO_ADMIN } from "@/routes/roles";

// Tarjeta con título para cada bloque del detalle
function Bloque({ icono: Icono, titulo, children }) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 font-semibold">
        <Icono className="size-5 text-primary" aria-hidden="true" />
        {titulo}
      </h2>
      {children}
    </div>
  );
}

// ==========================================================
// DETALLE DEL EMPLEADO  (GET /empleados/:id)
// Editar y asignar servicios es solo para el Administrador.
// ==========================================================
export default function EmpleadoDetallePage() {
  const { id } = useParams();
  const { rol } = useAuth();
  const esAdmin = SOLO_ADMIN.includes(rol);

  const { datos: empleado, cargando, error, recargar } = useApi(() => obtenerEmpleado(id), [id]);

  return (
    <section>
      <PageHeader
        titulo={empleado ? nombreCompleto(empleado.usuario) : "Detalle del empleado"}
        descripcion={empleado ? `Código ${empleado.codigoEmpleado}` : `Empleado #${id}`}
      >
        <BotonVolver a={PATHS.EMPLEADOS} />
        {esAdmin && empleado && (
          <>
            <Button variant="outline" asChild>
              <Link to={construirRuta(PATHS.EMPLEADO_SERVICIOS, { id })}>
                <BriefcaseBusiness />
                Servicios
              </Link>
            </Button>
            <Button asChild>
              <Link to={construirRuta(PATHS.EMPLEADO_EDITAR, { id })}>
                <Pencil />
                Editar
              </Link>
            </Button>
          </>
        )}
      </PageHeader>

      <EstadoConsulta cargando={cargando} error={error} onReintentar={recargar}>
        {empleado && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Bloque icono={UserRound} titulo="Datos del empleado">
              <dl className="grid gap-4 sm:grid-cols-2">
                <DatoDetalle etiqueta="Nombre completo">{nombreCompleto(empleado.usuario)}</DatoDetalle>
                <DatoDetalle etiqueta="Código">{empleado.codigoEmpleado}</DatoDetalle>
                <DatoDetalle etiqueta="Correo">{empleado.usuario?.correo}</DatoDetalle>
                <DatoDetalle etiqueta="Teléfono">{empleado.usuario?.telefono}</DatoDetalle>
                <DatoDetalle etiqueta="Especialidad">{empleado.especialidad?.nombre}</DatoDetalle>
                <DatoDetalle etiqueta="Estado">
                  <EstadoBadge activo={empleado.activo} />
                </DatoDetalle>
                <div className="sm:col-span-2">
                  <DatoDetalle etiqueta="Descripción">{empleado.descripcion}</DatoDetalle>
                </div>
              </dl>
            </Bloque>

            <Bloque icono={BriefcaseBusiness} titulo={`Servicios que realiza (${empleado.servicios?.length ?? 0})`}>
              {empleado.servicios?.length ? (
                <ul className="divide-y">
                  {empleado.servicios.map((s) => (
                    <li key={s.id} className="flex items-center justify-between gap-3 py-2.5">
                      <Link
                        to={construirRuta(PATHS.SERVICIO_DETALLE, { id: s.id })}
                        className="font-medium hover:text-primary hover:underline"
                      >
                        {s.nombre}
                      </Link>
                      <span className="text-sm whitespace-nowrap text-muted-foreground">
                        {colones(s.precioBase)} · {duracion(s.duracionMinutos)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No tiene servicios asignados.</p>
              )}
            </Bloque>

            <Bloque icono={Ban} titulo={`Restricciones de horario (${empleado.restricciones?.length ?? 0})`}>
              {empleado.restricciones?.length ? (
                <ul className="divide-y">
                  {empleado.restricciones.map((r) => (
                    <li key={r.id} className="py-2.5 text-sm">
                      <Link
                        to={construirRuta(PATHS.RESTRICCION_DETALLE, { id: r.id })}
                        className="font-medium hover:text-primary hover:underline"
                      >
                        {fechaLarga(r.fecha)}
                      </Link>
                      <p className="text-muted-foreground">{r.motivo}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No tiene restricciones registradas.</p>
              )}
            </Bloque>

            <Bloque icono={CalendarCheck} titulo={`Citas asignadas (${empleado.citas?.length ?? 0})`}>
              {empleado.citas?.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th className="py-2 pr-3">Fecha</th>
                        <th className="py-2 pr-3">Cliente</th>
                        <th className="py-2 pr-3">Servicio</th>
                        <th className="py-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {empleado.citas.slice(0, 8).map((c) => (
                        <tr key={c.id}>
                          <td className="py-2 pr-3 whitespace-nowrap">
                            {fechaLarga(c.fecha)} · {hora12(c.horaInicio)}
                          </td>
                          <td className="py-2 pr-3">{nombreCompleto(c.cliente)}</td>
                          <td className="py-2 pr-3">{c.servicio?.nombre}</td>
                          <td className="py-2">{c.estadoCita?.nombre}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No tiene citas registradas.</p>
              )}
            </Bloque>
          </div>
        )}
      </EstadoConsulta>
    </section>
  );
}
