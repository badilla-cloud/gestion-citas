import { CalendarCheck, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PATHS } from "@/routes/paths";
import { ADMIN_Y_EMPLEADO } from "@/routes/roles";

// Listado de citas (Avance 1: estructura de la página).
// Administrador y Empleado pueden registrar citas.
export default function CitasListadoPage() {
  const { rol } = useAuth();
  const puedeCrear = ADMIN_Y_EMPLEADO.includes(rol);

  return (
    <section>
      <PageHeader titulo="Citas" descripcion="Consulte las citas registradas en el sistema.">
        {puedeCrear && (
          <Button asChild>
            <Link to={PATHS.CITA_CREAR}>
              <Plus />
              Nueva cita
            </Link>
          </Button>
        )}
      </PageHeader>

      <EmptyState
        icono={CalendarCheck}
        titulo="No hay citas para mostrar"
        descripcion="Aquí se mostrará el listado de citas."
      />
    </section>
  );
}