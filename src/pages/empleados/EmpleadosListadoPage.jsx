import { Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PATHS } from "@/routes/paths";
import { SOLO_ADMIN } from "@/routes/roles";

// Listado de empleados (Avance 1: estructura de la página).
// Solo el Administrador puede registrar empleados.
export default function EmpleadosListadoPage() {
  const { rol } = useAuth();
  const puedeCrear = SOLO_ADMIN.includes(rol);

  return (
    <section>
      <PageHeader titulo="Empleados" descripcion="Personal que atiende las citas del establecimiento.">
        {puedeCrear && (
          <Button asChild>
            <Link to={PATHS.EMPLEADO_CREAR}>
              <Plus />
              Nuevo empleado
            </Link>
          </Button>
        )}
      </PageHeader>

      <EmptyState
        icono={Users}
        titulo="No hay empleados para mostrar"
        descripcion="Aquí se mostrará el listado de empleados registrados en el sistema."
      />
    </section>
  );
}
