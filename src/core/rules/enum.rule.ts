/**
 * Validates whether a value belongs to a closed list of allowed values.
 *
 * Not named `in` because that rule already validates ISIN codes (see in.rule.ts).
 *
 * @param value - The value to validate.
 * @param allowedValues - The list of values the value must belong to.
 * @returns {boolean} - True if the value is one of allowedValues, false otherwise.
 */
export function enumRule(value: any, allowedValues: readonly any[]): boolean {
    return Array.isArray(allowedValues) && allowedValues.includes(value);
}
