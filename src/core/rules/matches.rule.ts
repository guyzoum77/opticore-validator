/**
 * Validates that a string matches a pattern — `matches(value, /foo/i)` or `matches(value, "foo", "i")`
 * (documented in the README).
 *
 * Non-string values never match, and an invalid pattern never throws: the rule just fails.
 *
 * @param value - The value to validate.
 * @param pattern - A RegExp or a pattern source.
 * @param modifiers - RegExp flags, only used when `pattern` is a string.
 */
export function matchesRule(value: any, pattern: RegExp | string, modifiers?: string): boolean {
    if (typeof value !== "string") {
        return false;
    }

    try {
        const regex: RegExp = pattern instanceof RegExp ? new RegExp(pattern.source, pattern.flags.replace(/[gy]/g, "")) : new RegExp(pattern, modifiers);
        return regex.test(value);
    } catch {
        return false;
    }
}
