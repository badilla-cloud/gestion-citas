import { CalendarClock, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

import { obtenerLinksPorRol } from "@/components/layout/navLinks";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PATHS } from "@/routes/paths";

// ==========================================================
// INICIO
// Sin sesión: presentación y botones de acceso.
// Con sesión: saludo y accesos rápidos según el rol.
// ==========================================================
export default function InicioPage() {
  const { usuario, rol, autenticado } = useAuth();
  const accesos = obtenerLinksPorRol(rol);

  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-primary px-6 py-10 text-primary-foreground sm:px-10">
        <div className="flex items-center gap-2 text-sm opacity-80">
          <CalendarClock className="size-4" aria-hidden="true" />
          Gestión de Citas
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {autenticado ? `Hola, ${usuario.nombre}` : "Agende sus citas de forma rápida"}
        </h1>
        <p className="mt-3 max-w-2xl opacity-90">
          {autenticado
            ? "Desde aquí puede consultar los servicios, el personal y los horarios de atención."
            : "Consulte los servicios disponibles, elija al empleado que lo atenderá y agende la cita en el horario que mejor le funcione."}
        </p>
        {!autenticado && (
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="secondary" asChild>
              <Link to={PATHS.LOGIN}>
                <LogIn />
                Iniciar sesión
              </Link>
            </Button>
            <Button variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white" asChild>
              <Link to={PATHS.REGISTRO}>
                <UserPlus />
                Crear cuenta
              </Link>
            </Button>
          </div>
        )}
      </div>

      {autenticado && (
        <div>
          <h2 className="mb-4 text-lg font-semibold">Accesos rápidos</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {accesos.map((acceso) => {
              const Icono = acceso.icono ?? CalendarClock;
              return (
                <Link
                  key={acceso.ruta}
                  to={acceso.ruta}
                  className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition hover:border-primary hover:shadow-md"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icono className="size-5" aria-hidden="true" />
                  </div>
                  <span className="font-medium">{acceso.etiqueta}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
