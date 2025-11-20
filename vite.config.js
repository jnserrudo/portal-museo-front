import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === 'production';

  return {
    base: isProduction ? '/portal/' : '/',
    plugins: [react()],
    // Configuración para manejar rutas de activos
    resolve: {
      alias: {
        '/@/': new URL('./src/', import.meta.url).pathname,
      },
    },
    // Configuración para copiar archivos estáticos
    build: {
      assetsDir: 'assets',
      outDir: 'dist',
      sourcemap: !isProduction,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
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
