import { CalendarClock, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { mensajeDeError } from "@/api/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { PATHS } from "@/routes/paths";

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ==========================================================
// INICIAR SESIÓN (login básico)
// Consume POST /usuarios/login y luego GET /usuarios/perfil
// por medio de AuthContext.
// ==========================================================
export default function LoginPage() {
  const { iniciarSesion, autenticado } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.desde ?? PATHS.INICIO;

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});
  const [errorApi, setErrorApi] = useState(null);
  const [enviando, setEnviando] = useState(false);

  // Si ya tiene sesión no tiene sentido mostrar el login
  if (autenticado) {
    return <Navigate to={destino} replace />;
  }

  // Validación básica antes de llamar al API
  function validar() {
    const nuevos = {};
    if (!correo.trim()) nuevos.correo = "El correo es obligatorio.";
    else if (!CORREO_VALIDO.test(correo.trim())) nuevos.correo = "Ingrese un correo válido.";
    if (!password) nuevos.password = "La contraseña es obligatoria.";
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  }

  async function manejarEnvio(e) {
    e.preventDefault(); // evita que el formulario recargue la página
    setErrorApi(null);
    if (!validar()) return;

    try {
      setEnviando(true);
      await iniciarSesion(correo.trim(), password);
      navigate(destino, { replace: true });
    } catch (error) {
      setErrorApi(
        error.response?.status === 401 ? "Correo o contraseña incorrectos." : mensajeDeError(error)
      );
    } finally {
      setEnviando(false);
    }
  }

  const claseInput = (campo) =>
    `h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 ${
      errores[campo] ? "border-red-500" : "border-input"
    }`;

  return (
    <section className="flex justify-center py-6 sm:py-12">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <CalendarClock className="size-6 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
          <p className="text-sm text-muted-foreground">Ingrese con su correo y contraseña.</p>
        </div>

        {errorApi && (
          <p role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorApi}
          </p>
        )}

        <form onSubmit={manejarEnvio} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="correo" className="text-sm font-medium">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              autoComplete="email"
              placeholder="usuario@correo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={claseInput("correo")}
            />
            {errores.correo && <p className="text-xs text-red-600">{errores.correo}</p>}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={claseInput("password")}
            />
            {errores.password && <p className="text-xs text-red-600">{errores.password}</p>}
          </div>

          <Button type="submit" className="h-10 w-full" disabled={enviando}>
            {enviando ? <Loader2 className="animate-spin" /> : <LogIn />}
            {enviando ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ¿No tiene cuenta?{" "}
          <Link to={PATHS.REGISTRO} className="font-medium text-primary hover:underline">
            Regístrese como cliente
          </Link>
        </p>
      </div>
    </section>
  );
}
