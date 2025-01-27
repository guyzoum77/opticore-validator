import {Base64OptionsInterface} from "../interfaces/base64Options.interface";

/**
 *
 * @param value
 * @param options
 *
 * The base64Rule function is validating if a given string (value) conforms to Base64 encoding.
 * It supports two modes:
 * Standard Base64 encoding (default): Uses [A-Za-z0-9+/]*={0,2} regex pattern.
 * URL-safe Base64 encoding (if urlSafe option is true): Uses [A-Za-z0-9-_]*={0,2} regex pattern.
 *
 * The option parameter allows customization:
 * urlSafe: Specifies whether to validate against URL-safe Base64 encoding. Defaults to false.
 */
export function base64Rule(value: any, options?: Base64OptionsInterface): boolean {
    if (typeof value !== "string") {
        return false;
    }

    const defaultOptions: Base64OptionsInterface = {
        urlSafe: options?.urlSafe || false,
    };

    const { urlSafe } = defaultOptions;

    // Default regex for standard Base64 encoding
    let pattern: RegExp = /^[A-Za-z0-9+/]*={0,2}$/;
    if (urlSafe) {
        // Regex for URL-safe Base64 encoding
        pattern = /^[A-Za-z0-9-_]*={0,2}$/;
    }

    return pattern.test(value);
}