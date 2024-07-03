export function alphanumericRule(value: any): boolean {
    return typeof value === 'string' && /^[A-Za-z0-9]+$/.test(value);
}
  