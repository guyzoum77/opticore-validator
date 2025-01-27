/**
 * Validates whether a value is a valid ISBN (either ISBN-10 or ISBN-13).
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid ISBN, false otherwise.
 */
export function isbnRule(value: any): boolean {
    const isbn10Pattern: RegExp = /^(?:\d[\ |-]){9}[\d|X]$/; // ISBN-10 pattern
    const isbn13Pattern: RegExp = /^(?:\d[\ |-]){13}$/; // ISBN-13 pattern

    // Remove any potential delimiters (spaces, hyphens)
    const cleanedValue = value.replace(/[\s\-]/g, '');

    // Check if the cleaned value matches the ISBN-10 or ISBN-13 format
    if (isbn10Pattern.test(cleanedValue) || isbn13Pattern.test(cleanedValue)) {
        // If ISBN-10, validate the checksum
        if (cleanedValue.length === 10) {
            return SValidator.validateIsbn10(cleanedValue);
        }
        // If ISBN-13, validate the checksum
        if (cleanedValue.length === 13) {
            return SValidator.validateIsbn13(cleanedValue);
        }
    }

    return false;
}