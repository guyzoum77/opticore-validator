export function sizeRule(value: any, size: number): boolean {
    if (typeof value === "string" || Array.isArray(value)) {
      return value.length === size;
    } else if (typeof value === "object" && value !== null) {
      return Object.keys(value).length === size;
    }
    
    return false;
}