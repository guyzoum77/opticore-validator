/**
 * Validates whether a value is an integer, optionally within boundaries.
 *
 * As documented (`int(str [, options])`) the value may be a real integer (a JSON body) or a string holding one
 * (an environment variable, a query parameter). `options` may contain `min`, `max`, `lt` and `gt`.
 *
 * @param value - The value to validate.
 * @param options - Boundaries: `{ min?, max?, lt?, gt? }`.
 * @returns {boolean} - True if the value is a valid integer within the boundaries, false otherwise.
 */
export function intRule(value: any, options: { min?: number; max?: number; lt?: number; gt?: number } = {}): boolean {
    let numeric: number;
    if (typeof value === "number") {
        numeric = value;
    } else if (typeof value === "string" && /^[+-]?(?:0|[1-9]\d*)$/.test(value)) {
        numeric = Number(value);
    } else {
        return false;
    }

    if (!Number.isSafeInteger(numeric)) {
        return false;
    }

    const { min, max, lt, gt } = options ?? {};
    return (min === undefined || numeric >= min)
        && (max === undefined || numeric <= max)
        && (lt === undefined || numeric < lt)
        && (gt === undefined || numeric > gt);
}
