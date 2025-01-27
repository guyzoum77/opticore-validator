/**
 * Validates whether a value is a valid JWT (JSON Web Token).
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid JWT, false otherwise.
 */
export function jwtRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // Split the string by dots. A valid JWT should have 3 parts.
    const parts: string[] = value.split('.');

    // Check if there are exactly 3 parts (header, payload, signature)
    return parts.length === 3;
}