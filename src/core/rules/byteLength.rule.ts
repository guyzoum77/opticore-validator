export function byteLengthRule(value: any, min: number, max?: number): boolean {
    const length = Buffer.byteLength(value, 'utf8');
    return length >= min && (typeof max === 'undefined' || length <= max);
  }
  