import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The GitHub Pages workflow sets GITHUB_PAGES so assets resolve under /solid-cards/.
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? "/solid-cards/" : "/",
});
