import { Pencil, Sparkles } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { obtenerAdicional } from "@/api/adicionales.service";
import { BotonVolver } from "@/components/common/BotonVolver";
import { DatoDetalle } from "@/components/common/DatoDetalle";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { colones, fechaLarga } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";
import { SOLO_ADMIN } from "@/routes/roles";

// ==========================================================
// DETALLE DEL SERVICIO ADICIONAL  (GET /servicios-adicionales/:id)
// ==========================================================
export default function AdicionalDetallePage() {
  const { id } = useParams();
  const { rol } = useAuth();
  const esAdmin = SOLO_ADMIN.includes(rol);

  const { datos: adicional, cargando, error, recargar } = useApi(() => obtenerAdicional(id), [id]);

  return (
    <section>
      <PageHeader titulo={adicional?.nombre ?? "Detalle del adicional"} descripcion="Servicio adicional para las citas.">
        <BotonVolver a={PATHS.ADICIONALES} />
        {esAdmin && adicional && (
          <Button asChild>
            <Link to={construirRuta(PATHS.ADICIONAL_EDITAR, { id })}>
              <Pencil />
              Editar
            </Link>
          </Button>
        )}
      </PageHeader>

      <EstadoConsulta cargando={cargando} error={error} onReintentar={recargar}>
        {adicional && (
          <div className="max-w-3xl rounded-xl border bg-card p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="size-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-3xl font-bold">{colones(adicional.precio)}</p>
                <EstadoBadge activo={adicional.activo} />
              </div>
            </div>
            <p className="mb-6 text-muted-foreground">{adicional.descripcion}</p>
            <dl className="grid gap-4 sm:grid-cols-2">
              <DatoDetalle etiqueta="Nombre">{adicional.nombre}</DatoDetalle>
              <DatoDetalle etiqueta="Precio">{colones(adicional.precio)}</DatoDetalle>
              <DatoDetalle etiqueta="Registrado">{fechaLarga(adicional.creadoEn)}</DatoDetalle>
              <DatoDetalle etiqueta="Última actualización">{fechaLarga(adicional.actualizadoEn)}</DatoDetalle>
              {esAdmin && (
                <DatoDetalle etiqueta="Citas que lo incluyen">{adicional.citas?.length ?? 0}</DatoDetalle>
              )}
            </dl>
          </div>
        )}
      </EstadoConsulta>
    </section>
  );
}
