/**
 * Validates whether a value is a valid JSON string.
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid JSON string, false otherwise.
 */
export function jsonRule(value: any): boolean {
    try {
        // Attempt to parse the string as JSON
        JSON.parse(value);
        return true; // If no error is thrown, it's valid JSON
    } catch (e) {
        return false; // If an error is thrown, it's not valid JSON
    }
}