export function hexadecimalRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // Regular expression for validating hexadecimal strings
    const hexPattern: RegExp = /^[a-fA-F0-9]+$/;

    return hexPattern.test(value);
}