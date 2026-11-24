import { cn } from "@/lib/utils";

// Etiqueta de estado Activo / Inactivo
export function EstadoBadge({ activo, textoActivo = "Activo", textoInactivo = "Inactivo" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        activo ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-700"
      )}
    >
      {activo ? textoActivo : textoInactivo}
    </span>
  );
}
