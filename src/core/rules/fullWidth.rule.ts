export function fullWidthRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // Regular expression to detect full-width characters
    const fullWidthRegex: RegExp = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE]/;
    return fullWidthRegex.test(value);
}