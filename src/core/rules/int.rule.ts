/**
 * Validates whether a value is an integer.
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid integer, false otherwise.
 */
export function intRule(value: any): boolean {
    return Number.isInteger(value);
}