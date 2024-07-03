export function ipv6Rule(value: any): boolean {
    const ipv6Regex = /^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/;
    return ipv6Regex.test(value);
}
  