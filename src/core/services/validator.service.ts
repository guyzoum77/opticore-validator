class SValidator {
    static parseDate(dateString: string, format: string): Date {
        // For simplicity, assume the format is 'YYYY-MM-DD' as an example
        const parts: string[] = dateString.split('-');
        if (parts.length !== 3) {
            throw new Error('Invalid date format, expected format is YYYY-MM-DD');
        }

        const [year, month, day] = parts.map(Number);
        return new Date(year, month - 1, day);
    }

    /**
     * Validates an ISBN-10 checksum.
     *
     * @param isbn10 - The ISBN-10 string.
     * @returns {boolean} - True if the ISBN-10 checksum is valid, false otherwise.
     */
    static validateIsbn10(isbn10: string): boolean {
        let sum: number = 0;
        for (let i = 0; i < 9; i++) {
            sum += (10 - i) * parseInt(isbn10.charAt(i), 10);
        }

        const checksum: string = isbn10.charAt(9).toUpperCase();
        sum += (checksum === 'X') ? 10 : parseInt(checksum, 10);

        return sum % 11 === 0;
    }

    /**
     * Validates an ISBN-13 checksum.
     *
     * @param isbn13 - The ISBN-13 string.
     * @returns {boolean} - True if the ISBN-13 checksum is valid, false otherwise.
     */
    static validateIsbn13(isbn13: string): boolean {
        let sum: number = 0;
        for (let i = 0; i < 12; i++) {
            sum += (i % 2 === 0 ? 1 : 3) * parseInt(isbn13.charAt(i), 10);
        }

        const checksum: number = 10 - (sum % 10);
        return parseInt(isbn13.charAt(12), 10) === (checksum === 10 ? 0 : checksum);
    }

    /**
     * Converts an ISIN string to an array of digits.
     *
     * @param isin - The ISIN string without the check digit.
     * @returns {number[]} - The array of digits.
     */
    static convertToDigits(isin: string): number[] {
        const digits: number[] = [];

        for (let char of isin) {
            if (/[A-Z]/.test(char)) {
                // Convert letters to their corresponding digits (A=10, B=11, ..., Z=35)
                digits.push(char.charCodeAt(0) - 55);
            } else {
                // Convert numbers to digits
                digits.push(parseInt(char, 10));
            }
        }

        return digits;
    }

    /**
     * Validates a string of digits using the Luhn algorithm.
     *
     * @param digits - The array of digits to validate.
     * @returns {boolean} - True if the Luhn checksum is valid, false otherwise.
     */
    static isValidLuhn(digits: number[]): boolean {
        let sum: number = 0;
        let shouldDouble: boolean = false;

        // Traverse the digits in reverse order
        for (let i = digits.length - 1; i >= 0; i--) {
            let digit: number = digits[i];

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            shouldDouble = !shouldDouble; // Toggle the doubling flag
        }

        // If the sum modulo 10 is 0, the ISIN is valid
        return sum % 10 === 0;
    }
}