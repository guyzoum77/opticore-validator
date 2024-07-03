export function requiredRule(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
}
  