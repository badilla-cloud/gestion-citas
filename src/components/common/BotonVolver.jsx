import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

// Botón "Volver" para las páginas de detalle
export function BotonVolver({ a }) {
  return (
    <Button variant="outline" asChild>
      <Link to={a}>
        <ArrowLeft />
        Volver
      </Link>
    </Button>
  );
}
