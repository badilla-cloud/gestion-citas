import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Permite importar con "@/..." en lugar de rutas relativas largas
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
