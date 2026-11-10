import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Une clases de Tailwind y resuelve conflictos (utilidad estándar de shadcn)
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
