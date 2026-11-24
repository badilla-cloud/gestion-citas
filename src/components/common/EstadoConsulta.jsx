import { Cargando } from "./Cargando";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";

// ==========================================================
// ESTADO DE UNA CONSULTA
// Decide qué mostrar según el resultado de useApi:
//   1. cargando  -> indicador de carga
//   2. error     -> mensaje de error con botón Reintentar
//   3. vacío     -> EmptyState
//   4. con datos -> el contenido (children)
//
// Uso:
// <EstadoConsulta cargando={cargando} error={error} vacio={lista.length === 0}
//   onReintentar={recargar} tituloVacio="No hay servicios registrados">
//   ...lista...
// </EstadoConsulta>
// ==========================================================
export function EstadoConsulta({
  cargando,
  error,
  vacio,
  onReintentar,
  icono,
  tituloVacio = "No hay información para mostrar",
  descripcionVacio,
  children,
}) {
  if (cargando) return <Cargando />;
  if (error) return <ErrorState mensaje={error} onReintentar={onReintentar} />;
  if (vacio) return <EmptyState icono={icono} titulo={tituloVacio} descripcion={descripcionVacio} />;
  return children;
}
