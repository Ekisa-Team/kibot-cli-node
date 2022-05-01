import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/kibot.ts"],
    format: ["esm"],
    clean: !options.watch,
    minify: false,
  };
});
