export function divisibleByRule(value: any, divisor: number): boolean {
    if (typeof value !== 'number' && typeof value !== 'string') return false;

    const num = parseFloat(value as any);

    // Ensure the value and divisor are valid numbers
    if (isNaN(num) || isNaN(divisor) || divisor === 0) {
        return false;
    }

    // Check divisibility
    return num % divisor === 0;
}