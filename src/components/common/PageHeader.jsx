// ==========================================================
// ENCABEZADO DE PÁGINA
// Título, descripción opcional y un espacio a la derecha para
// botones de acción (por ejemplo "Nuevo empleado").
//
// Uso:
// <PageHeader titulo="Empleados" descripcion="Listado de empleados">
//   <Button>Nuevo empleado</Button>
// </PageHeader>
// ==========================================================
export function PageHeader({ titulo, descripcion, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{titulo}</h1>
        {descripcion && <p className="text-muted-foreground">{descripcion}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}
