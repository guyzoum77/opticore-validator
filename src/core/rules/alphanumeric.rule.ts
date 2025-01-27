import {AlphanumericOptionsInterface} from "../interfaces/alphanumericOptions.interface";
import {alphanumericPatternsUtils} from "../../utils/alphanumericPatterns.utils";

/**
 *
 * @param value
 * @param options
 *
 * The alphanumericRule function checks if a given string (value)
 * conforms to alphanumeric patterns based on the specified locale.
 * It uses a predefined set of regular expressions (alphanumericPatterns)
 * for various locales to validate alphanumeric characters.
 *
 * The option parameter allows customization:
 * locale: Specifies the locale for which the validation pattern should be applied.
 * Defaults to 'en-US'.
 * ignore: Specifies characters or patterns to ignore during validation.
 */
export function alphanumericRule(value: any, options?: AlphanumericOptionsInterface): boolean {
    if (typeof value !== "string") {
        return false;
    }

    const defaultOptions: AlphanumericOptionsInterface = {
        locale: options?.locale || "en-US",
        ignore: options?.ignore || undefined,
    };

    const { locale, ignore } = defaultOptions;
    const pattern: RegExp = alphanumericPatternsUtils[locale] || /^[A-Za-z0-9\s]+$/; // Default to English (the United States)
    let stringValue: string = value;

    if (ignore) {
        const ignoreRegex: RegExp = typeof ignore === "string"
            ? new RegExp(`[${ignore.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")}]`, "g")
            : ignore;
        stringValue = stringValue.replace(ignoreRegex, '');
    }

    return pattern.test(stringValue);
}
  