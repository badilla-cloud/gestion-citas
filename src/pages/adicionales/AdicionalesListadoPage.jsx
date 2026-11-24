import { Eye, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { obtenerAdicionales } from "@/api/adicionales.service";
import { CampoBusqueda, SelectFiltro } from "@/components/common/CampoBusqueda";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { colones, normalizar } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";
import { SOLO_ADMIN } from "@/routes/roles";

// ==========================================================
// LISTADO DE SERVICIOS ADICIONALES  (GET /servicios-adicionales)
// En pantallas grandes se ve como tabla y en celular como tarjetas.
// ==========================================================
export default function AdicionalesListadoPage() {
  const { rol } = useAuth();
  const esAdmin = SOLO_ADMIN.includes(rol);

  const { datos: adicionales, cargando, error, recargar } = useApi(obtenerAdicionales);
  const [busqueda, setBusqueda] = useState("");
  const [estado, setEstado] = useState("todos");

  const filtrados = (adicionales ?? []).filter((a) => {
    if (!esAdmin && !a.activo) return false;
    if (estado === "activos" && !a.activo) return false;
    if (estado === "inactivos" && a.activo) return false;
    return normalizar(`${a.nombre} ${a.descripcion}`).includes(normalizar(busqueda));
  });

  return (
    <section>
      <PageHeader titulo="Servicios adicionales" descripcion="Extras que se pueden agregar a una cita.">
        {esAdmin && (
          <Button asChild>
            <Link to={PATHS.ADICIONAL_CREAR}>
              <Plus />
              Nuevo adicional
            </Link>
          </Button>
        )}
      </PageHeader>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <CampoBusqueda valor={busqueda} onCambiar={setBusqueda} placeholder="Buscar adicional..." />
        {esAdmin && (
          <SelectFiltro
            etiqueta="Estado"
            valor={estado}
            onCambiar={setEstado}
            opciones={[
              { valor: "todos", texto: "Todos los estados" },
              { valor: "activos", texto: "Activos" },
              { valor: "inactivos", texto: "Inactivos" },
            ]}
          />
        )}
      </div>

      <EstadoConsulta
        cargando={cargando}
        error={error}
        onReintentar={recargar}
        vacio={filtrados.length === 0}
        icono={Sparkles}
        tituloVacio={adicionales?.length ? "Ningún adicional coincide con la búsqueda" : "No hay servicios adicionales registrados"}
        descripcionVacio="Los adicionales registrados por el administrador aparecerán aquí."
      >
        {/* Tabla: pantallas medianas y grandes */}
        <div className="hidden overflow-hidden rounded-xl border bg-card shadow-sm md:block">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Nombre</th>
                <th className="px-4 py-3">Descripción</th>
                <th className="px-4 py-3 text-right">Precio</th>
                {esAdmin && <th className="px-4 py-3">Estado</th>}
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtrados.map((a) => (
                <tr key={a.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium">{a.nombre}</td>
                  <td className="max-w-md px-4 py-3 text-muted-foreground">{a.descripcion}</td>
                  <td className="px-4 py-3 text-right font-medium whitespace-nowrap">{colones(a.precio)}</td>
                  {esAdmin && (
                    <td className="px-4 py-3">
                      <EstadoBadge activo={a.activo} />
                    </td>
                  )}
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={construirRuta(PATHS.ADICIONAL_DETALLE, { id: a.id })}>
                        <Eye />
                        Ver
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tarjetas: celular */}
        <div className="grid gap-3 md:hidden">
          {filtrados.map((a) => (
            <Link
              key={a.id}
              to={construirRuta(PATHS.ADICIONAL_DETALLE, { id: a.id })}
              className="rounded-xl border bg-card p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">{a.nombre}</h2>
                <span className="font-semibold whitespace-nowrap">{colones(a.precio)}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{a.descripcion}</p>
              {esAdmin && (
                <div className="mt-2">
                  <EstadoBadge activo={a.activo} />
                </div>
              )}
            </Link>
          ))}
        </div>
      </EstadoConsulta>
    </section>
  );
}
