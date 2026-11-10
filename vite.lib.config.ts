import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Distribution build: generates ESM, CommonJS and TypeScript declarations. */
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "VietriDS",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: (id) =>
        /^(react|react-dom)(\/|$)/.test(id) ||
        /^@mui\/material(\/|$)/.test(id) ||
        /^@emotion\/(react|styled)(\/|$)/.test(id) ||
        /^lucide-react(\/|$)/.test(id),
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
