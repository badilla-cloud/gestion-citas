import { useCallback, useEffect, useState } from "react";

import { mensajeDeError } from "@/api/client";

// ==========================================================
// HOOK useApi
// Patrón de carga / error / vacío reutilizable en todas las páginas.
//
// Uso:
//   const { datos, cargando, error, recargar } = useApi(obtenerServicios);
//   const { datos } = useApi(() => obtenerServicio(id), [id]);
//
// - Se ejecuta al montar la página (useEffect) y cada vez que
//   cambian las dependencias (por ejemplo el id de la URL).
// - "recargar" permite volver a intentar si hubo un error.
// ==========================================================
export function useApi(funcionConsulta, dependencias = []) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cargar = useCallback(funcionConsulta, dependencias);

  const ejecutar = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const resultado = await cargar();
      setDatos(resultado);
    } catch (err) {
      setError(mensajeDeError(err));
    } finally {
      setCargando(false);
    }
  }, [cargar]);

  useEffect(() => {
    ejecutar();
  }, [ejecutar]);

  return { datos, cargando, error, recargar: ejecutar };
}
