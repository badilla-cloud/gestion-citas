import { Clock } from "lucide-react";

import { obtenerDiasSemana } from "@/api/catalogos.service";
import { obtenerHorarios } from "@/api/horarios.service";
import { EstadoBadge } from "@/components/common/EstadoBadge";
import { EstadoConsulta } from "@/components/common/EstadoConsulta";
import { PageHeader } from "@/components/common/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import { hora12 } from "@/lib/formato";
import { cn } from "@/lib/utils";
import { SOLO_ADMIN } from "@/routes/roles";

// ==========================================================
// HORARIOS DE ATENCIÓN  (GET /horarios-atencion y GET /dias-semana)
// Se muestra una tarjeta por día de la semana con sus franjas.
// Los clientes y empleados solo ven las franjas activas.
// ==========================================================
export default function HorariosListadoPage() {
  const { rol } = useAuth();
  const esAdmin = SOLO_ADMIN.includes(rol);

  const { datos: horarios, cargando, error, recargar } = useApi(obtenerHorarios);
  const { datos: dias, cargando: cargandoDias, error: errorDias, recargar: recargarDias } = useApi(obtenerDiasSemana);

  const visibles = (horarios ?? []).filter((h) => esAdmin || h.activo);

  // Agrupa las franjas por día y las ordena por hora de inicio
  const diasOrdenados = [...(dias ?? [])].sort((a, b) => a.numeroOrden - b.numeroOrden);
  const porDia = diasOrdenados.map((dia) => ({
    ...dia,
    franjas: visibles
      .filter((h) => h.diaSemanaId === dia.id)
      .sort((a, b) => a.horaInicio.localeCompare(b.horaInicio)),
  }));

  return (
    <section>
      <PageHeader
        titulo="Horarios de atención"
        descripcion="Días y horas en que el establecimiento atiende citas."
      />

      <EstadoConsulta
        cargando={cargando || cargandoDias}
        error={error || errorDias}
        onReintentar={() => {
          recargar();
          recargarDias();
        }}
        vacio={visibles.length === 0}
        icono={Clock}
        tituloVacio="No hay horarios de atención registrados"
        descripcionVacio="Cuando el administrador registre los horarios aparecerán aquí por día de la semana."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {porDia.map((dia) => {
            const abierto = dia.franjas.some((f) => f.activo);
            return (
              <div
                key={dia.id}
                className={cn(
                  "rounded-xl border bg-card p-5 shadow-sm",
                  !abierto && "bg-muted/40"
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold">{dia.nombre}</h2>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      abierto ? "bg-emerald-100 text-emerald-800" : "bg-gray-200 text-gray-600"
                    )}
                  >
                    {abierto ? "Abierto" : "Cerrado"}
                  </span>
                </div>

                {dia.franjas.length ? (
                  <ul className="space-y-2">
                    {dia.franjas.map((f) => (
                      <li key={f.id} className="flex items-center justify-between gap-2 text-sm">
                        <span className="flex items-center gap-2 whitespace-nowrap">
                          <Clock className="size-4 text-primary" aria-hidden="true" />
                          {hora12(f.horaInicio)} – {hora12(f.horaFin)}
                        </span>
                        {/* Solo el administrador ve las franjas inactivas */}
                        {esAdmin && !f.activo && <EstadoBadge activo={false} />}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">Sin horario de atención.</p>
                )}
              </div>
            );
          })}
        </div>
      </EstadoConsulta>
    </section>
  );
}
