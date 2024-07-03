export function alphaRule(value: any): boolean {
    return typeof value === 'string' && /^[A-Za-z]+$/.test(value);
}
  