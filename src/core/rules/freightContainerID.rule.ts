export function freightContainerIDRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // Validate the structure of the Freight Container ID
    const regex: RegExp = /^[A-Z]{4}[0-9]{7}$/;
    if (!regex.test(value)) return false;

    // Check digit validation (ISO 6346 standard)
    const ownerCode: string = value.slice(0, 3);
    const equipmentCategory: string = value[3];
    const serialNumber: string = value.slice(4, 10);
    const checkDigit: number = parseInt(value[10], 10);

    // Convert letters to numeric values (A=10, B=12, ..., Z=38)
    const toNumericValue = (char: string): number => {
        const charCode: number = char.charCodeAt(0);
        return charCode - 55; // 'A' is 10, 'B' is 12, ..., 'Z' is 38
    };

    // Validate equipment category (optional check)
    if (!/[UJZ]/.test(equipmentCategory)) return false;

    // Calculate the check digit
    const fullNumber: number = [
        ...ownerCode,
        equipmentCategory,
        ...serialNumber
    ].map((char, index: number) => {
        const numericValue: number = isNaN(parseInt(char, 10)) ? toNumericValue(char) : parseInt(char, 10);
        return numericValue * Math.pow(2, index) % 11;
    }).reduce((sum: number, value: number) => sum + value, 0) % 11;

    const calculatedCheckDigit: number = fullNumber === 10 ? 0 : fullNumber;

    return checkDigit === calculatedCheckDigit;
}