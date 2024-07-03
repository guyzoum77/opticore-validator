export function asciiRule(value: any): boolean {
    return typeof value === 'string' && /^[\x00-\x7F]+$/.test(value);
}
  