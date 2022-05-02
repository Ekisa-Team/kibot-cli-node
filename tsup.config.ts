import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["src/kibot.ts"],
    format: ["cjs"],
    clean: true,
    minify: !options.watch,
  };
});
