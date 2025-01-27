export function hexColorRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // Regular expression for validating hex color codes
    const hexColorPattern: RegExp = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/;

    return hexColorPattern.test(value);
}