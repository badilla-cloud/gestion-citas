import { Ban } from "lucide-react";

import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";

// Restricciones de horario (Avance 1: estructura de la página).
export default function RestriccionesListadoPage() {
  return (
    <section>
      <PageHeader
        titulo="Restricciones de horario"
        descripcion="Fechas y horas en las que no se pueden agendar citas."
      />

      <EmptyState
        icono={Ban}
        titulo="No hay restricciones para mostrar"
        descripcion="Aquí se mostrará el listado de restricciones de horario registradas."
      />
    </section>
  );
}
