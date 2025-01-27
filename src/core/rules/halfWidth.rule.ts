export function halfWidthRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // Regular expression to detect half-width characters
    const halfWidthRegex: RegExp = /^[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE]+$/;
    return halfWidthRegex.test(value);
}