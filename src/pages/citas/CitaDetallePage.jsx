import { ArrowLeft, CalendarCheck, Pencil } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { construirRuta, PATHS } from "@/routes/paths";
import { ADMIN_Y_EMPLEADO } from "@/routes/roles";

// Detalle de una cita (Avance 1: estructura de la página).
// Administrador y Empleado pueden editarla.
export default function CitaDetallePage() {
  const { id } = useParams();
  const { rol } = useAuth();
  const puedeEditar = ADMIN_Y_EMPLEADO.includes(rol);

  return (
    <section>
      <PageHeader titulo="Detalle de la cita" descripcion={`Cita #${id}`}>
        <Button variant="outline" asChild>
          <Link to={PATHS.CITAS}>
            <ArrowLeft />
            Volver
          </Link>
        </Button>
        {puedeEditar && (
          <Button asChild>
            <Link to={construirRuta(PATHS.CITA_EDITAR, { id })}>
              <Pencil />
              Editar
            </Link>
          </Button>
        )}
      </PageHeader>

      <EmptyState
        icono={CalendarCheck}
        titulo="Información de la cita"
        descripcion="Aquí se mostrarán el cliente, el empleado, los servicios, la fecha y el estado de la cita."
      />
    </section>
  );
}