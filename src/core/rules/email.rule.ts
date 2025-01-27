export function emailRule(value: any): boolean {
    if (typeof value !== "string") {
        return false;
    }
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(value);
}