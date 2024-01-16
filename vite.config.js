// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  // Specify the entry file for your application
  build: {
    outDir: "dist", // Specify the output directory for the production build
  },
  server: {
    host: "0.0.0.0",
  },
});
