import {ByteLengthOptionsInterface} from "../interfaces/byteLengthOptions.interface";

/**
 *
 * @param value
 * @param options
 *
 * The byteLengthRule function now accepts an option parameter of type ByteLengthOptions.
 *
 * ByteLengthOptions includes min and max properties
 * to specify the minimum and maximum byte length constraints for the string.
 * Inside the function, byte length constraints are checked using min and max values provided in options.
 *
 * The function calculates the byte length of the string using Node.js Buffer.byteLength method with the specified
 * encoding (defaulting to 'utf8').
 */
export function byteLengthRule(value: any, options?: ByteLengthOptionsInterface): boolean {
    if (typeof value !== "string") {
        return false;
    }

    const defaultOptions: ByteLengthOptionsInterface = {
        encoding: options?.encoding || "utf8",
        min: options?.min ?? 0,
        max: options?.max,
    };

    const { encoding, min, max } = defaultOptions;

    const byteLength: number = Buffer.byteLength(value, encoding);

    if (min !== undefined && byteLength < min) {
        return false;
    }

    if (max !== undefined && byteLength > max) {
        return false;
    }

    return true;
}
  