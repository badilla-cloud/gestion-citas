import { Outlet } from "react-router-dom";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

// ==========================================================
// LAYOUT PRINCIPAL
// Estructura común de todas las páginas: barra de navegación
// arriba, contenido en el centro y pie de página abajo.
// <Outlet /> es el espacio donde React Router dibuja la página actual.
// ==========================================================
export function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
