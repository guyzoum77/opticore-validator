import { ipv4Rule } from './ipv4.rule';
import { ipv6Rule } from './ipv6.rule';

export function ipRule(value: any): boolean {
  return ipv4Rule(value) || ipv6Rule(value);
}
