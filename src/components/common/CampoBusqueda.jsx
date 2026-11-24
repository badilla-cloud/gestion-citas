import { Search } from "lucide-react";

// Campo de búsqueda reutilizable para los listados
export function CampoBusqueda({ valor, onCambiar, placeholder = "Buscar..." }) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-md border border-input bg-background pr-3 pl-9 text-sm outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

// Lista desplegable reutilizable para filtrar
export function SelectFiltro({ valor, onCambiar, opciones, etiqueta }) {
  return (
    <select
      aria-label={etiqueta}
      value={valor}
      onChange={(e) => onCambiar(e.target.value)}
      className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 sm:w-auto"
    >
      {opciones.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.texto}
        </option>
      ))}
    </select>
  );
}
