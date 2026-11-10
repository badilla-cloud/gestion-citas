import { Inbox } from "lucide-react";

// ==========================================================
// ESTADO VACÍO
// Se muestra cuando una lista no tiene datos o cuando el
// contenido todavía no está disponible.
//
// Uso:
// <EmptyState
//   icono={Users}
//   titulo="No hay empleados registrados"
//   descripcion="Cuando se registre un empleado aparecerá aquí."
// >
//   <Button>Nuevo empleado</Button>   (opcional)
// </EmptyState>
// ==========================================================
export function EmptyState({ icono: Icono = Inbox, titulo, descripcion, children }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-14 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icono className="size-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-medium">{titulo}</h2>
      {descripcion && <p className="max-w-md text-sm text-muted-foreground">{descripcion}</p>}
      {children && <div className="mt-2 flex flex-wrap justify-center gap-2">{children}</div>}
    </div>
  );
}
