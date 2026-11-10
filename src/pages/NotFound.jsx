import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";

// ==========================================================
// PÁGINA 404
// Se muestra cuando la dirección escrita no existe.
// ==========================================================
export default function NotFound() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center gap-4 py-16 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="size-8 text-muted-foreground" aria-hidden="true" />
      </div>
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Página no encontrada</h1>
      <p className="max-w-md text-muted-foreground">
        La dirección <code className="rounded bg-muted px-1.5 py-0.5 text-sm">{pathname}</code> no
        existe o fue movida.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft />
          Regresar
        </Button>
        <Button asChild>
          <Link to={PATHS.INICIO}>
            <Home />
            Ir al inicio
          </Link>
        </Button>
      </div>
    </section>
  );
}
