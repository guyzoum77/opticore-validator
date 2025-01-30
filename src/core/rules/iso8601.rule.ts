export function iso8601Rule(value: any): boolean {
    if (typeof value !== "string") return false;

    // ISO 8601 Regex Pattern (strict validation)
    const iso8601Regex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(?:T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9](?:\.\d{1,3})?)?(Z|([+-](?:0[0-9]|1[0-3]):[0-5][0-9]))?)?$/;

    return iso8601Regex.test(value);
}