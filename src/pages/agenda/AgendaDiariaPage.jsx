import { CalendarDays } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";

// Agenda diaria del establecimiento (Avance 1: estructura de la página).
export default function AgendaDiariaPage() {
  return (
    <section>
      <PageHeader
        titulo="Agenda diaria"
        descripcion="Citas de todos los empleados para la fecha seleccionada."
      />

      <EmptyState
        icono={CalendarDays}
        titulo="No hay citas para esta fecha"
        descripcion="Aquí se mostrarán las citas de todos los empleados para la fecha seleccionada."
      />
    </section>
  );
}