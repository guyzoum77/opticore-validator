export function floatRule(value: any): boolean {
    return typeof value === 'number' && !isNaN(value) && Number.isFinite(value);
}