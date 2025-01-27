/**
 * Validates whether the length of a string or array matches the specified length or falls within a range.
 *
 * @param value - The value to validate (string or array).
 * @param options - Options for length validation.
 * @param options.min - The minimum length (inclusive).
 * @param options.max - The maximum length (inclusive).
 * @returns {boolean} - True if the length is valid, false otherwise.
 */
export function lengthRule(value: any, options: { min?: number; max?: number } = {}): boolean {
    console.log('Checking value:', value);  // Log the exact value being checked
    console.log('Type of value:', typeof value);  // Log the type of value

    if (typeof value !== 'string' && !Array.isArray(value)) {
        console.log('Invalid value type:', value);  // Log invalid types
        return false;
    }

    const length = value.length;
    const { min, max } = options;

    console.log('Validating length for', value, 'with min', min, 'and max', max);  // Debugging log
    return length >= min && length <= max;
}