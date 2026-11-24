import { Ban, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { obtenerTiposRestriccion } from "@/api/catalogos.service";
import { obtenerRestricciones } from "@/api/restricciones.service";
import { CampoBusqueda, SelectFiltro } from "@/components/common/CampoBusqueda";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { fechaLarga, hora12, nombreCompleto, normalizar } from "@/lib/formato";
import { construirRuta, PATHS } from "@/routes/paths";

// Texto del horario afectado por la restricción
export function textoHorario(r) {
  if (r.todoElDia || !r.horaInicio) return "Todo el día";
  return `${hora12(r.horaInicio)} – ${hora12(r.horaFin)}`;
}

// A quién afecta: un empleado o todo el establecimiento
export function textoAfecta(r) {
  return r.empleado ? nombreCompleto(r.empleado.usuario) : "Todo el establecimiento";
}

// ==========================================================
// RESTRICCIONES DE HORARIO  (GET /restricciones-horario)
// Fechas u horas en que no se pueden agendar citas.
// ==========================================================
export default function RestriccionesListadoPage() {
  const { datos: restricciones, cargando, error, recargar } = useApi(obtenerRestricciones);
  const { datos: tipos } = useApi(obtenerTiposRestriccion);

  const [busqueda, setBusqueda] = useState("");
  const [tipoId, setTipoId] = useState("todos");
  const [periodo, setPeriodo] = useState("proximas");

  const hoy = new Date().toLocaleDateString("en-CA"); // "YYYY-MM-DD" de hoy

  const filtradas = (restricciones ?? [])
    .filter((r) => {
      if (tipoId !== "todos" && r.tipoRestriccionId !== Number(tipoId)) return false;
      if (periodo === "proximas" && r.fecha < hoy) return false;
      if (periodo === "pasadas" && r.fecha >= hoy) return false;
      return normalizar(`${r.motivo} ${textoAfecta(r)}`).includes(normalizar(busqueda));
    })
    .sort((a, b) => (periodo === "pasadas" ? b.fecha.localeCompare(a.fecha) : a.fecha.localeCompare(b.fecha)));

  return (
    <section>
      <PageHeader titulo="Restricciones de horario" descripcion="Días u horas en que no se pueden agendar citas." />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <CampoBusqueda valor={busqueda} onCambiar={setBusqueda} placeholder="Motivo o empleado..." />
        <SelectFiltro
          etiqueta="Tipo"
          valor={tipoId}
          onCambiar={setTipoId}
          opciones={[
            { valor: "todos", texto: "Todos los tipos" },
            ...(tipos ?? []).map((t) => ({ valor: String(t.id), texto: t.nombre })),
          ]}
        />
        <SelectFiltro
          etiqueta="Periodo"
          valor={periodo}
          onCambiar={setPeriodo}
          opciones={[
            { valor: "proximas", texto: "Próximas" },
            { valor: "pasadas", texto: "Pasadas" },
            { valor: "todas", texto: "Todas" },
          ]}
        />
      </div>

      <EstadoConsulta
        cargando={cargando}
        error={error}
        onReintentar={recargar}
        vacio={filtradas.length === 0}
        icono={Ban}
        tituloVacio={restricciones?.length ? "Ninguna restricción coincide con los filtros" : "No hay restricciones registradas"}
        descripcionVacio="Aquí se mostrarán los feriados, vacaciones y demás bloqueos de horario."
      >
        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3">Horario</th>
                <th className="px-4 py-3">Afecta a</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Motivo</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtradas.map((r) => (
                <tr key={r.id} className="hover:bg-muted/40">
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{fechaLarga(r.fecha)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{textoHorario(r)}</td>
                  <td className="px-4 py-3">{textoAfecta(r)}</td>
                  <td className="px-4 py-3">{r.tipoRestriccion?.nombre}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.motivo}</td>
                  <td className="px-4 py-3">
                    <EstadoBadge activo={r.activo} textoActivo="Vigente" textoInactivo="Anulada" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={construirRuta(PATHS.RESTRICCION_DETALLE, { id: r.id })}>
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
      </EstadoConsulta>
    </section>
  );
}
