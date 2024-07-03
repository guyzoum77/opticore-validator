export function containsLowercaseRule(value: any): boolean {
    if (typeof value !== 'string') return false;
    for (const char of value) {
        if (char >= 'a' && char <= 'z') return true;
    }
    return false;
}