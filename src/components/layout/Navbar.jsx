import { Link } from "react-router-dom";

import { PATHS } from "@/routes/paths";

// Navbar provisional del proyecto base.
// Kenneth lo reemplaza por el definitivo: responsive, con menú
// hamburguesa (Sheet de shadcn) y opciones según el rol.
export function Navbar() {
  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center px-4 sm:px-6">
        <Link to={PATHS.INICIO} className="font-semibold">
          Gestión de Citas
        </Link>
      </nav>
    </header>
  );
}
