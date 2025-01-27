export function notBlankRule(value: any): boolean {
  return typeof value === "string" && value.trim() !== "";
}