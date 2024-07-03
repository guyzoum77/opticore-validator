export function base32Rule(value: any): boolean {
    return typeof value === 'string' && /^[A-Z2-7]+=*$/.test(value);
}
  