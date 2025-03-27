import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3001,
  },
  assetsInclude: ["**/*.glb"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Make sure this points to the correct directory
    },
  },
});
