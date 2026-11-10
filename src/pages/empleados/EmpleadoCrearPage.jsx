import { ArrowLeft, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";

// Registro de un empleado (Avance 1: estructura de la página).
export default function EmpleadoCrearPage() {
  return (
    <section>
      <PageHeader titulo="Nuevo empleado" descripcion="Registre los datos de un nuevo empleado.">
        <Button variant="outline" asChild>
          <Link to={PATHS.EMPLEADOS}>
            <ArrowLeft />
            Volver a empleados
          </Link>
        </Button>
      </PageHeader>

      <EmptyState
        icono={UserPlus}
        titulo="Formulario de registro"
        descripcion="Aquí irá el formulario para registrar un empleado."
      />
    </section>
  );
}
