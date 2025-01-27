export function hslRule(value: any): boolean {
    if (typeof value !== 'string') return false;

    // Regular expression for validating HSL or HSLA colors
    const hslRegex = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(,\s*((0(\.\d+)?)|(1(\.0+)?))\s*)?\)$/i;

    if (!hslRegex.test(value)) {
        return false;
    }

    // Extract numeric values
    const match = value.match(hslRegex);
    if (!match) return false;

    const hue = parseInt(match[1], 10); // Hue: 0-360
    const saturation = parseInt(match[2], 10); // Saturation: 0-100%
    const lightness = parseInt(match[3], 10); // Lightness: 0-100%
    const alpha = match[5] ? parseFloat(match[5]) : 1; // Alpha: 0-1

    // Validate ranges
    return (
        hue >= 0 &&
        hue <= 360 &&
        saturation >= 0 &&
        saturation <= 100 &&
        lightness >= 0 &&
        lightness <= 100 &&
        alpha >= 0 &&
        alpha <= 1
    );
}