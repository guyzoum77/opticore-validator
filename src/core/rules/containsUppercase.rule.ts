export function containsUppercaseRule(value: any):  boolean {
    if (typeof value !== "string") {
        return false;
    }
    for (const char of value) {
        if (char >= "A" && char <= "Z") return true;
    }

    return false;
}