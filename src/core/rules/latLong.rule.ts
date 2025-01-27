/**
 * Validates whether a value is a valid latitude and longitude pair.
 *
 * @param value - The value to validate.
 * @returns {boolean} - True if the value is a valid lat-long pair, false otherwise.
 */
export function latLongRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // Split the value into latitude and longitude
    const parts: string[] = value.split(',');

    // Ensure there are exactly two parts
    if (parts.length !== 2) return false;

    // Parse the parts as numbers
    const latitude: number = parseFloat(parts[0].trim());
    const longitude: number = parseFloat(parts[1].trim());

    // Check if both latitude and longitude are valid numbers within their respective ranges
    const isValidLatitude: boolean = latitude >= -90 && latitude <= 90;
    const isValidLongitude: boolean = longitude >= -180 && longitude <= 180;

    return isValidLatitude && isValidLongitude;
}