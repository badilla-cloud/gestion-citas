import { Clock } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";

// Horarios de atención del establecimiento (Avance 1: estructura de la página).
export default function HorariosListadoPage() {
  return (
    <section>
      <PageHeader
        titulo="Horarios de atención"
        descripcion="Días y horas en que el establecimiento atiende citas."
      />

      <EmptyState
        icono={Clock}
        titulo="No hay horarios para mostrar"
        descripcion="Aquí se mostrarán los horarios de atención de cada día de la semana."
      />
    </section>
  );
}
