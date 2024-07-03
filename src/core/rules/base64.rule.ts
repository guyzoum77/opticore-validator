export function base64Rule(value: any): boolean {
    return typeof value === 'string' && /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(value);
}
  