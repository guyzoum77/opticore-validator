export function abaRoutingRule(value: any): boolean {
    if (typeof value !== "string") return false;
    const abaRegex: RegExp = /^\d{9}$/;
    if (!abaRegex.test(value)) return false;
  
    const checksum = (7 * (parseInt(value[0]) + parseInt(value[3]) + parseInt(value[6]))
      + 3 * (parseInt(value[1]) + parseInt(value[4]) + parseInt(value[7]))
      + 9 * (parseInt(value[2]) + parseInt(value[5]) + parseInt(value[8]))) % 10;
  
    return checksum === 0;
}