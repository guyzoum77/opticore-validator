/**
 * Validates whether a value is a valid ISIN (International Security Identification Number).
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid ISIN, false otherwise.
 */
export function inRule(value: any): boolean {
    const isinPattern: RegExp = /^[A-Z]{2}[A-Z0-9]{10}$/; // ISIN pattern (two letters, followed by 10 alphanumeric characters)

    // Ensure the value matches the ISIN pattern
    if (!isinPattern.test(value)) {
        return false;
    }

    // Remove the last check digit
    const isinWithoutCheckDigit = value.slice(0, -1);

    // Convert the ISIN to a string of digits (using the Luhn algorithm)
    const isinDigits: number[] = SValidator.convertToDigits(isinWithoutCheckDigit);

    // Validate the check digit using the Luhn algorithm
    return SValidator.isValidLuhn(isinDigits);
}