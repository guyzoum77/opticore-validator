import {Base32OptionsInterface} from "../interfaces/base32Options.interface";

/**
 *
 * @param value
 * @param options
 *
 * The base32Rule function is validating if a given string (value) conforms to Base32 encoding.
 * It supports two modes:
 * RFC 4648 Base32 encoding (default): Uses [A-Z2-7]+=* regex pattern.
 * Crockford's Base32 encoding (if crockford option is true): Uses [A-Z0-9]+=* regex pattern.
 *
 * The option parameter allows customization: crockford: Specifies whether to validate
 * against Crockford's Base32 encoding.
 * Defaults to false.
 */
export function base32Rule(value: any, options?: Base32OptionsInterface): boolean {
    if (typeof value !== "string") {
        return false;
    }

    const defaultOptions: Base32OptionsInterface = {
        crockford: options?.crockford || false,
    };

    const { crockford } = defaultOptions;

    // Default regex for RFC 4648 Base32 encoding
    let pattern: RegExp = /^[A-Z2-7]+=*$/;
    if (crockford) {
        // Regex for Crockford's Base32 encoding
        pattern = /^[A-Z0-9]+=*$/;
    }

    return pattern.test(value);
}
  