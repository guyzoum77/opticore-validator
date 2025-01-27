export function minLengthRule(value: any, min: number): boolean {
    return typeof value === "string" && value.length >= min;
}