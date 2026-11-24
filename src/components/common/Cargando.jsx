import { Loader2 } from "lucide-react";

// Indicador de carga mientras se espera la respuesta del API
export function Cargando({ mensaje = "Cargando información..." }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 rounded-lg border px-6 py-14 text-center text-muted-foreground"
    >
      <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
      <p className="text-sm">{mensaje}</p>
    </div>
  );
}
