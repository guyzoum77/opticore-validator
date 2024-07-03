export function base58Rule(value: any): boolean {
    return typeof value === 'string' && /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/.test(value);
}
  