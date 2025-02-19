import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import {visualizer} from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
   
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      plugins: [
        visualizer({
          open: true, // Automatically open the visualization in the browser
        }),
      ],
      output: {
        manualChunks: {
          vendor: ["@codemirror/lang-python","@codemirror/theme-one-dark","@uiw/react-codemirror","react-syntax-highlighter","lucide-react"],
        },
      },
    },
  },

});
