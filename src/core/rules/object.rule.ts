export function objectRule(value: any): boolean {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
  