export function containsSpecialCharRule(value: any): boolean {
    if (typeof value !== 'string') return false;
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    for (const char of value) {
        if (specialChars.includes(char)) return true;
    }
    return false;
}