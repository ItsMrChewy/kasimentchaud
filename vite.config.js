import { globSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const pages = globSync("**/*.html", {
  cwd: import.meta.dirname,
  exclude: ["node_modules/**", "dist/**", ".output/**"],
});

export default defineConfig({
  appType: "mpa",
  server: { host: "0.0.0.0" },
  build: {
    rolldownOptions: {
      input: pages.map((page) => resolve(import.meta.dirname, page)),
    },
  },
});
