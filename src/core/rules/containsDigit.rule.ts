export function containsDigitRule(value: any): boolean {
    if (typeof value !== "string") return false;
    for (const char of value) {
        if (char >= "0" && char <= "9") return true;
    }

    return false;
}