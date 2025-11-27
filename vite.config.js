import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProduction = mode === 'production';

  return {
    base: isProduction ? '/portal/' : '/',
    plugins: [react()],
    publicDir: 'public',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProduction,
      // Copiar archivos estáticos de la carpeta public
      copyPublicDir: true,
      rollupOptions: {
        output: {
          // Mantener la estructura de directorios para los assets
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name.split('.');
            const ext = info[info.length - 1];
            if (['png', 'jpg', 'jpeg', 'gif', 'svg'].includes(ext)) {
              return `assets/images/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
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

  };
});
