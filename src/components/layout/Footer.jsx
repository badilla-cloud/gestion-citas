import { CalendarClock } from "lucide-react";

// ==========================================================
// PIE DE PÁGINA
// Se muestra al final de todas las páginas (MainLayout).
// ==========================================================
export function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <div className="flex items-center gap-2 font-medium text-foreground">
          <CalendarClock className="size-4 text-primary" aria-hidden="true" />
          Gestión de Citas
        </div>
        <p>ISW-521 Programación en Ambiente Web I · Universidad Técnica Nacional</p>
        <p>© {anio}</p>
      </div>
    </footer>
  );
}
