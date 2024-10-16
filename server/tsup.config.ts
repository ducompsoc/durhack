import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: {
      main: "src/main.ts",
      "assign-tickets": "src/assign-tickets.ts",
    },
    target: "node22",
    format: "esm",
    splitting: true,
    clean: true,
    minify: false,
    outDir: "dist",
    external: ["tsx"],
  },
])
