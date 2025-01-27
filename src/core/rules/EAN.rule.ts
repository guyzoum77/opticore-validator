export function eanRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // EAN must be 8 or 13 digits long
    const eanPattern: RegExp = /^\d{8}$|^\d{13}$/;
    if (!eanPattern.test(value)) return false;

    // Perform checksum validation
    const digits: number[] = value.split('').map(Number);
    const length: number = digits.length;

    let checksum: number = 0;
    for (let i = 0; i < length - 1; i++) {
        checksum += digits[i] * (length === 8 ? (i % 2 === 0 ? 3 : 1) : (i % 2 === 0 ? 1 : 3));
    }

    const calculatedCheckDigit: number = (10 - (checksum % 10)) % 10;

    return calculatedCheckDigit === digits[length - 1];
}