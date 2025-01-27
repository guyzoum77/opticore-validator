export function bicRule(value: any): boolean {
    return typeof value === "string" && /^[A-Za-z]{4}[A-Za-z]{2}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/.test(value);
}