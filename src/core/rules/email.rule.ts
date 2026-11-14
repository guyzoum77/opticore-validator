export function emailRule(value: any): boolean {
    if (typeof value !== "string") {
        return false;
    }
    // RFC 5321 caps an address at 254 characters; the cap also bounds the regex below, which backtracks in
    // quadratic time on long inputs such as "a@" followed by thousands of dots (ReDoS)
    if (value.length > 254) {
        return false;
    }
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(value);
}