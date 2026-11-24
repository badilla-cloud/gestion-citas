import { Ban } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { obtenerRestriccion } from "@/api/restricciones.service";
import { BotonVolver } from "@/components/common/BotonVolver";
import { DatoDetalle } from "@/components/common/DatoDetalle";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { useApi } from "@/hooks/useApi";
import { fechaLarga } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";
import { textoAfecta, textoHorario } from "./RestriccionesListadoPage";

// ==========================================================
// DETALLE DE LA RESTRICCIÓN  (GET /restricciones-horario/:id)
// ==========================================================
export default function RestriccionDetallePage() {
  const { id } = useParams();
  const { datos: r, cargando, error, recargar } = useApi(() => obtenerRestriccion(id), [id]);

  return (
    <section>
      <PageHeader titulo="Detalle de la restricción" descripcion={`Restricción #${id}`}>
        <BotonVolver a={PATHS.RESTRICCIONES} />
      </PageHeader>

      <EstadoConsulta cargando={cargando} error={error} onReintentar={recargar}>
        {r && (
          <div className="max-w-3xl rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <Ban className="size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xl font-semibold">{fechaLarga(r.fecha)}</p>
                <p className="text-muted-foreground">{textoHorario(r)}</p>
              </div>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2">
              <DatoDetalle etiqueta="Tipo de restricción">{r.tipoRestriccion?.nombre}</DatoDetalle>
              <DatoDetalle etiqueta="Estado">
                <EstadoBadge activo={r.activo} textoActivo="Vigente" textoInactivo="Anulada" />
              </DatoDetalle>
              <DatoDetalle etiqueta="Afecta a">
                {r.empleado ? (
                  <Link
                    to={construirRuta(PATHS.EMPLEADO_DETALLE, { id: r.empleado.id })}
                    className="font-medium text-primary hover:underline"
                  >
                    {textoAfecta(r)}
                  </Link>
                ) : (
                  textoAfecta(r)
                )}
              </DatoDetalle>
              <DatoDetalle etiqueta="Horario">{textoHorario(r)}</DatoDetalle>
              <div className="sm:col-span-2">
                <DatoDetalle etiqueta="Motivo">{r.motivo}</DatoDetalle>
              </div>
              <DatoDetalle etiqueta="Registrada">{fechaLarga(r.creadoEn)}</DatoDetalle>
            </dl>
          </div>
        )}
      </EstadoConsulta>
    </section>
  );
}
