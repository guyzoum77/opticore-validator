/**
 * Validates whether a value exists within a specified array of allowed values.
 *
 * @param value - The value to validate.
 * @param allowedValues - An array of allowed values.
 * @returns {boolean} - True if the value exists in the array, false otherwise.
 */
export function inRule(value: any, allowedValues: any[]): boolean {
    if (!Array.isArray(allowedValues)) {
        throw new Error("The 'in' rule requires an array of allowed values.");
    }
    return allowedValues.includes(value);
}