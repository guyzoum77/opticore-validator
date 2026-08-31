import {defineConfig} from "tsup";
export default defineConfig({
    name: "opticore-validator",
    format: ["cjs", "esm"],
    entry: { index: 'src/index.ts', opticoreValidator: 'bin/opticoreValidator.ts' },
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true
});