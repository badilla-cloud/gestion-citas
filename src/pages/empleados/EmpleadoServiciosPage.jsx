import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { construirRuta, PATHS } from "@/routes/paths";

// Servicios que atiende un empleado (Avance 1: estructura de la página).
export default function EmpleadoServiciosPage() {
  const { id } = useParams();

  return (
    <section>
      <PageHeader
        titulo="Servicios del empleado"
        descripcion={`Asigne o quite los servicios que atiende el empleado #${id}.`}
      >
        <Button variant="outline" asChild>
          <Link to={construirRuta(PATHS.EMPLEADO_DETALLE, { id })}>
            <ArrowLeft />
            Volver al detalle
          </Link>
        </Button>
      </PageHeader>

      <EmptyState
        icono={BriefcaseBusiness}
        titulo="Sin servicios asignados"
        descripcion="Aquí se mostrarán los servicios asignados al empleado y la opción para asignar nuevos."
      />
    </section>
  );
}
