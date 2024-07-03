export function containsRule(value: any, seed: string): boolean {
    return typeof value === 'string' && value.includes(seed);
}
  