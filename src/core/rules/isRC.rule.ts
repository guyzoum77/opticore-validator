/**
 * Validates whether a value is a valid Registration Code (RC).
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid RC, false otherwise.
 */
export function isRCRule(value: any): boolean {
    const rcPattern: RegExp = /^[A-Z0-9]{9,14}$/; // RC pattern (alphanumeric, 9 to 14 characters)

    // Ensure the value matches the RC pattern
    return rcPattern.test(value);
}