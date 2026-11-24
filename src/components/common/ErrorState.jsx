import { AlertTriangle, RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";

// Mensaje de error con opción de volver a intentar la consulta
export function ErrorState({ mensaje, onReintentar }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-red-200 bg-red-50 px-6 py-12 text-center"
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-red-100">
        <AlertTriangle className="size-6 text-red-600" aria-hidden="true" />
      </div>
      <h2 className="text-lg font-medium text-red-800">No se pudo cargar la información</h2>
      <p className="max-w-md text-sm text-red-700">{mensaje}</p>
      {onReintentar && (
        <Button variant="outline" onClick={onReintentar} className="mt-1">
          <RotateCw />
          Reintentar
        </Button>
      )}
    </div>
  );
}
