import { ArrowLeft, Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { construirRuta, PATHS } from "@/routes/paths";

// Edición de un empleado (Avance 1: estructura de la página).
export default function EmpleadoEditarPage() {
  const { id } = useParams();

  return (
    <section>
      <PageHeader titulo="Editar empleado" descripcion={`Empleado #${id}`}>
        <Button variant="outline" asChild>
          <Link to={construirRuta(PATHS.EMPLEADO_DETALLE, { id })}>
            <ArrowLeft />
            Volver al detalle
          </Link>
        </Button>
      </PageHeader>

      <EmptyState
        icono={Pencil}
        titulo="Formulario de edición"
        descripcion="Aquí irá el formulario para modificar los datos del empleado."
      />
    </section>
  );
}
