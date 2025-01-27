import {AlphaOptionsInterface} from "../interfaces/alphaOptions.interface";
import {alphaPatternsUtils} from "../../utils/alphaPatterns.utils";

export function alphaRule(value: any, options?: AlphaOptionsInterface): boolean {
    if (typeof value !== "string") return false;

    const defaultOptions: AlphaOptionsInterface = {
        locale: options?.locale || "en-US",
        ignore: options?.ignore || undefined,
    };

    const { locale, ignore } = defaultOptions;
    let pattern: RegExp = alphaPatternsUtils[locale];

    if (!pattern) {
        // Fallback to 'en-US' if a locale pattern is not found
        pattern = alphaPatternsUtils["en-US"];
    }

    if (ignore) {
        // Escape ignore characters for regex
        const ignorePattern: string = typeof ignore === "string"
            ? ignore.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            : ignore.source;
        const ignoreRegex: RegExp = new RegExp(`[${ignorePattern}]`, "g");
        value = value.replace(ignoreRegex, "");
    }

    return pattern.test(value);
}
  