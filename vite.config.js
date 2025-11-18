import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_BASE_URL || "/portal/",
    plugins: [react()],
    server: {
      ...(command === "serve" && {
        proxy: {
          "/api": {
            target: env.VITE_API_URL || "http://localhost:3000",
            changeOrigin: true,
            secure: false,
            // ✅ NO usar rewrite: ¡debe preservar /api!
            // El backend ya espera /api/eventos.
          },
        },
      }),
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: true,
    },
  };
});
