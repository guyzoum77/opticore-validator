/**
 * Validates whether a value is a valid ISSN (International Standard Serial Number).
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid ISSN, false otherwise.
 */
export function issnRule(value: any): boolean {
    // ISSN pattern: 4 digits or letters, a dash, 4 digits or letters, with the final digit being 'X' allowed
    const issnPattern: RegExp = /^[0-9X]{4}-[0-9X]{4}$/i;

    // Ensure the value matches the ISSN pattern
    return issnPattern.test(value);
}
