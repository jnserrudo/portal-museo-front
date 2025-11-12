import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/portal/", // ← 🔑 ¡ESTA ES LA LÍNEA CLAVE!

  plugins: [react()],
});
