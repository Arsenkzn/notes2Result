import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [],
      manifest: {
        name: "My Notes App",
        short_name: "Notes",
        description: "Приложение для заметок",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html}"],
      },
    }),
  ],
});
