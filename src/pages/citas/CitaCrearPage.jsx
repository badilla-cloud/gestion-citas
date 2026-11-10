import { ArrowLeft, CalendarPlus } from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";

// Registro de una cita (Avance 1: estructura de la página).
export default function CitaCrearPage() {
  return (
    <section>
      <PageHeader titulo="Nueva cita" descripcion="Registre una cita según la agenda del empleado.">
        <Button variant="outline" asChild>
          <Link to={PATHS.CITAS}>
            <ArrowLeft />
            Volver a citas
          </Link>
        </Button>
      </PageHeader>

      <EmptyState
        icono={CalendarPlus}
        titulo="Formulario de la cita"
        descripcion="Aquí irá el formulario para registrar una cita con la agenda del empleado."
      />
    </section>
  );
}

