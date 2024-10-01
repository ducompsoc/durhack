import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: ["./src/**/*"],
    target: "esnext",
    format: "esm",
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    minify: false,
    outDir: "dist",
  },
])
