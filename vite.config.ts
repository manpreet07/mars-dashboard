import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig((config) => {
  const isProd = config.mode === "production";
  return {
    base: isProd ? "/mars-dashboard/" : "/",
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "marsDashboardApp",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App.tsx",
        },
        shared: ["react", "react-dom", "react-router-dom"],
        remotes: {},
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      outDir: "dist",
    },
    server: {
      port: 5001,
    },
  };
});
