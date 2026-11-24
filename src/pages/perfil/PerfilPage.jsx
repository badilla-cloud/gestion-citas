import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";

import { obtenerPerfil } from "@/api/usuarios.service";
import { DatoDetalle } from "@/components/common/DatoDetalle";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { useApi } from "@/hooks/useApi";
import { fechaLarga, nombreCompleto } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";

// ==========================================================
// MI PERFIL
// Consulta del usuario autenticado: GET /usuarios/perfil
// ==========================================================
export default function PerfilPage() {
  const { datos: perfil, cargando, error, recargar } = useApi(obtenerPerfil);

  return (
    <section>
      <PageHeader titulo="Mi perfil" descripcion="Información de la cuenta con la que inició sesión." />

      <EstadoConsulta cargando={cargando} error={error} onReintentar={recargar}>
        {perfil && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Tarjeta con el nombre y el rol */}
            <div className="flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center shadow-sm">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
                {perfil.nombre?.[0]}
                {perfil.primerApellido?.[0]}
              </div>
              <div>
                <h2 className="text-lg font-semibold">{nombreCompleto(perfil)}</h2>
                <p className="text-sm text-muted-foreground">{perfil.correo}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {perfil.rol?.nombre}
              </span>
            </div>

            {/* Datos de la cuenta */}
            <div className="rounded-xl border bg-card p-6 shadow-sm lg:col-span-2">
              <h3 className="mb-4 flex items-center gap-2 font-semibold">
                <CircleUser className="size-5 text-primary" aria-hidden="true" />
                Datos personales
              </h3>
              <dl className="grid gap-5 sm:grid-cols-2">
                <DatoDetalle etiqueta="Nombre">{perfil.nombre}</DatoDetalle>
                <DatoDetalle etiqueta="Apellidos">
                  {[perfil.primerApellido, perfil.segundoApellido].filter(Boolean).join(" ")}
                </DatoDetalle>
                <DatoDetalle etiqueta="Correo">{perfil.correo}</DatoDetalle>
                <DatoDetalle etiqueta="Teléfono">{perfil.telefono}</DatoDetalle>
                <DatoDetalle etiqueta="Rol">{perfil.rol?.nombre}</DatoDetalle>
                <DatoDetalle etiqueta="Estado">
                  <EstadoBadge activo={perfil.activo} />
                </DatoDetalle>
                <DatoDetalle etiqueta="Miembro desde">{fechaLarga(perfil.creadoEn)}</DatoDetalle>
                {perfil.empleado && (
                  <DatoDetalle etiqueta="Código de empleado">
                    <Link
                      to={construirRuta(PATHS.EMPLEADO_DETALLE, { id: perfil.empleado.id })}
                      className="font-medium text-primary hover:underline"
                    >
                      {perfil.empleado.codigoEmpleado}
                    </Link>
                  </DatoDetalle>
                )}
              </dl>
            </div>
          </div>
        )}
      </EstadoConsulta>
    </section>
  );
}
