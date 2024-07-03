export function maxLengthRule(value: any, max: number): boolean {
    return typeof value === 'string' && value.length <= max;
}
  