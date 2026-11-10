import { CalendarClock, LogIn, LogOut, Menu, CircleUser, UserPlus } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { PATHS } from "@/routes/paths";
import { obtenerLinksPorRol } from "./navLinks";

// ==========================================================
// BARRA DE NAVEGACIÓN
// - Pantallas grandes: enlaces en línea.
// - Pantallas pequeñas: menú hamburguesa con el Sheet de shadcn.
// - Solo muestra las opciones que el rol del usuario puede ver.
// ==========================================================

// Estilo de un enlace del menú; resalta la página actual
function claseEnlace({ isActive }) {
  return cn(
    "flex items-center gap-2 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
  );
}

export function Navbar() {
  const { usuario, rol, autenticado, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const links = obtenerLinksPorRol(rol);

  function manejarCerrarSesion() {
    cerrarSesion();
    navigate(PATHS.LOGIN);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-4 sm:px-6"
      >
        {/* Logo */}
        <Link to={PATHS.INICIO} className="flex shrink-0 items-center gap-2 font-semibold">
          <CalendarClock className="size-6 text-primary" aria-hidden="true" />
          <span>Gestión de Citas</span>
        </Link>

        {/* Enlaces en pantallas grandes */}
        <ul className="hidden flex-1 items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.ruta}>
              <NavLink to={link.ruta} className={claseEnlace}>
                {link.etiqueta}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Usuario / acceso en pantallas grandes */}
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          {autenticado ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to={PATHS.PERFIL} title="Mi perfil">
                  <CircleUser />
                  <span className="max-w-32 truncate">{usuario.nombre}</span>
                  <span className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                    {rol}
                  </span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={manejarCerrarSesion}>
                <LogOut />
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to={PATHS.LOGIN}>Iniciar sesión</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to={PATHS.REGISTRO}>Registrarse</Link>
              </Button>
            </>
          )}
        </div>

        {/* Menú hamburguesa en pantallas pequeñas */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto lg:hidden" aria-label="Abrir menú">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 gap-0">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2">
                <CalendarClock className="size-5 text-primary" aria-hidden="true" />
                Gestión de Citas
              </SheetTitle>
              <SheetDescription>
                {autenticado ? `${usuario.nombre} · ${rol}` : "No ha iniciado sesión"}
              </SheetDescription>
            </SheetHeader>

            <ul className="flex flex-col gap-1 p-4">
              {links.map((link) => {
                const Icono = link.icono;
                return (
                  <li key={link.ruta}>
                    <SheetClose asChild>
                      <NavLink to={link.ruta} className={claseEnlace}>
                        <Icono className="size-4" aria-hidden="true" />
                        {link.etiqueta}
                      </NavLink>
                    </SheetClose>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto flex flex-col gap-2 border-t p-4">
              {autenticado ? (
                <>
                  <SheetClose asChild>
                    <NavLink to={PATHS.PERFIL} className={claseEnlace}>
                      <CircleUser className="size-4" aria-hidden="true" />
                      Mi perfil
                    </NavLink>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="outline" onClick={manejarCerrarSesion}>
                      <LogOut />
                      Cerrar sesión
                    </Button>
                  </SheetClose>
                </>
              ) : (
                <>
                  <SheetClose asChild>
                    <Button variant="outline" asChild>
                      <Link to={PATHS.LOGIN}>
                        <LogIn />
                        Iniciar sesión
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link to={PATHS.REGISTRO}>
                        <UserPlus />
                        Registrarse
                      </Link>
                    </Button>
                  </SheetClose>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
