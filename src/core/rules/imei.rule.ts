export function imeiRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // IMEI must be 15 digits long and numeric
    const imeiPattern: RegExp = /^[0-9]{15}$/;
    if (!imeiPattern.test(value)) return false;

    // Validate using the Luhn algorithm
    return luhnCheck(value);
}

// Luhn algorithm implementation
function luhnCheck(value: string): boolean {
    let sum: number = 0;
    let shouldDouble: boolean = false;

    // Process digits from right to left
    for (let i = value.length - 1; i >= 0; i--) {
        let digit: number = parseInt(value[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9; // If doubling results in two digits, sum them
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}