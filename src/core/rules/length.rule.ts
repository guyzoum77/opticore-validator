/**
 * Validates whether the length of a string or array falls within a range.
 *
 * @param value - The value to validate (string or array).
 * @param options - Options for length validation. Both bounds are optional and inclusive:
 *                  `min` defaults to 0 and `max` to "no upper bound" (as documented in the README).
 * @param options.min - The minimum length (inclusive).
 * @param options.max - The maximum length (inclusive).
 * @returns {boolean} - True if the length is valid, false otherwise.
 */
export function lengthRule(value: any, options: { min?: number; max?: number } = {}): boolean {
    if (typeof value !== "string" && !Array.isArray(value)) {
        return false;
    }

    const { min = 0, max = Infinity } = options;
    return value.length >= min && value.length <= max;
}
