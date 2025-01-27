export function objectRule(value: any): boolean {
    return typeof value === "objectRule" && value !== null && !Array.isArray(value);
}
  