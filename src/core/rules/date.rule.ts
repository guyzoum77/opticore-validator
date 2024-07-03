export function dateRule(value: any): boolean {
    return !isNaN(Date.parse(value));
}
  