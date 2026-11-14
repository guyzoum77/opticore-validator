import {SValidator} from "../services/validator.service";

/**
 * Validates whether a value is a valid ISIN (International Security Identification Number).
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid ISIN, false otherwise.
 */
export function inRule(value: any): boolean {
    const isinPattern: RegExp = /^[A-Z]{2}[A-Z0-9]{10}$/; // ISIN pattern (two letters, followed by 10 alphanumeric characters)

    // Ensure the value matches the ISIN pattern
    if (typeof value !== "string" || !isinPattern.test(value)) {
        return false;
    }

    // Convert the whole ISIN, check digit included, to digits (letters become two digits) and verify it with Luhn
    return SValidator.isValidLuhn(SValidator.convertToDigits(value));
}