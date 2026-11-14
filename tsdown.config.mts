import { defineConfig } from "tsdown";

export default defineConfig({
    entry: {
        index: "src/index.ts",
        cli: "src/cli/registerValidatorCommand.ts",
        opticoreValidator: "bin/opticoreValidator.ts",
    },
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    platform: "node",
    shims: true,
});
