// Página 404. Versión mínima del proyecto base; Kenneth la termina.
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { PATHS } from "@/routes/paths";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-5xl font-bold text-primary">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Página no encontrada</h1>
      <p className="text-muted-foreground">La dirección que buscó no existe.</p>
      <Button asChild>
        <Link to={PATHS.INICIO}>Volver al inicio</Link>
      </Button>
    </section>
  );
}
