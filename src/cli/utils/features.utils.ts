import * as path from "path";
import * as fs from "fs-extra";

export const FEATURES_DIR: string = path.join("src", "features");

/**
 * A "feature" is any directory directly under src/features — the layout
 * used across Opticore projects (src/features/<name>/application/validators/...).
 */
export function listFeatures(projectRoot: string): string[] {
    const featuresDir: string = path.join(projectRoot, FEATURES_DIR);
    if (!fs.existsSync(featuresDir)) {
        return [];
    }
    return fs.readdirSync(featuresDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
}

export function featureValidatorsDir(projectRoot: string, featureName: string): string {
    return path.join(projectRoot, FEATURES_DIR, featureName, "application", "validators");
}
