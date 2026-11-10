import { ArrowLeft, BriefcaseBusiness, Pencil, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { construirRuta, PATHS } from "@/routes/paths";
import { SOLO_ADMIN } from "@/routes/roles";

// Detalle de un empleado (Avance 1: estructura de la página).
// Editar y asignar servicios es solo para el Administrador.
export default function EmpleadoDetallePage() {
  const { id } = useParams();
  const { rol } = useAuth();
  const esAdmin = SOLO_ADMIN.includes(rol);

  return (
    <section>
      <PageHeader titulo="Detalle del empleado" descripcion={`Empleado #${id}`}>
        <Button variant="outline" asChild>
          <Link to={PATHS.EMPLEADOS}>
            <ArrowLeft />
            Volver
          </Link>
        </Button>
        {esAdmin && (
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

      <EmptyState
        icono={UserRound}
        titulo="Información del empleado"
        descripcion="Aquí se mostrará la información del empleado, sus servicios y su agenda."
      />
    </section>
  );
}
