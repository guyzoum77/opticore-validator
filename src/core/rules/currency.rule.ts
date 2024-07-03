export function currencyRule(value: any): boolean {
    return typeof value === 'string' && /^\$?(\d{1,3})(,?\d{3})*(\.\d{1,2})?$/.test(value);
}
  