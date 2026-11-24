// ==========================================================
// FUNCIONES DE FORMATO
// El API devuelve precios como texto ("15000.00"), fechas como
// "YYYY-MM-DD" y horas como "HH:mm". Aquí se convierten a un
// formato fácil de leer para el usuario.
// ==========================================================

const formatoColones = new Intl.NumberFormat("es-CR", {
  style: "currency",
  currency: "CRC",
  maximumFractionDigits: 0,
});

// "15000.00" -> "₡15 000"
export function colones(valor) {
  return formatoColones.format(Number(valor ?? 0));
}

// { nombre, primerApellido, segundoApellido } -> "Ana Mora Solís"
export function nombreCompleto(persona) {
  if (!persona) return "";
  return [persona.nombre, persona.primerApellido, persona.segundoApellido]
    .filter(Boolean)
    .join(" ");
}

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

// "2026-12-12" o "2026-12-12T00:00:00.000Z" -> "12 de diciembre de 2026"
// Se separa el texto en lugar de usar new Date() para no correr la fecha por la zona horaria.
export function fechaLarga(fecha) {
  if (!fecha) return "";
  const [anio, mes, dia] = String(fecha).slice(0, 10).split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${anio}`;
}

// "14:30" -> "2:30 p. m."
// También acepta "1970-01-01T14:30:00.000Z" (algunos endpoints devuelven la hora así).
export function hora12(hora) {
  if (!hora) return "";
  const texto = String(hora).includes("T") ? String(hora).slice(11, 16) : String(hora);
  const [h, m] = texto.split(":").map(Number);
  const sufijo = h >= 12 ? "p. m." : "a. m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${sufijo}`;
}

// 90 -> "1 h 30 min"
export function duracion(minutos) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

// Quita tildes y pasa a minúscula para que la búsqueda no dependa de eso
export function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
