// Par "etiqueta: valor" para las páginas de detalle
export function DatoDetalle({ etiqueta, children }) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{etiqueta}</dt>
      <dd className="text-sm">{children || "—"}</dd>
    </div>
  );
}
