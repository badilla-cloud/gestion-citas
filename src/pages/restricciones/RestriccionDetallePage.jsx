import { ArrowLeft, Ban } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";

// Detalle de una restricción de horario (Avance 1: estructura de la página).
export default function RestriccionDetallePage() {
  const { id } = useParams();

  return (
    <section>
      <PageHeader titulo="Detalle de la restricción" descripcion={`Restricción #${id}`}>
        <Button variant="outline" asChild>
          <Link to={PATHS.RESTRICCIONES}>
            <ArrowLeft />
            Volver
          </Link>
        </Button>
      </PageHeader>

      <EmptyState
        icono={Ban}
        titulo="Información de la restricción"
        descripcion="Aquí se mostrarán la fecha, el horario y el motivo de la restricción."
      />
    </section>
  );
}
