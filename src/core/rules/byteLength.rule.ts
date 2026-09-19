import {ByteLengthOptionsInterface} from "../interfaces/byteLengthOptions.interface";

/**
 * Validates the byte length of a string (UTF-8 by default).
 *
 * Both call styles are supported:
 *  - `byteLength(value, min, max?)`            — the positional form documented in the README, which is what a
 *                                                schema such as `{ rule: "byteLength", args: [1, 512] }` produces;
 *  - `byteLength(value, { min, max, encoding })` — the options-object form.
 *
 * (Only the object form used to be read, so a schema using the documented positional arguments silently
 * accepted every string.)
 *
 * @param value
 * @param minOrOptions - the minimum byte length, or an options object.
 * @param max - the maximum byte length (positional form only).
 */
export function byteLengthRule(value: any, minOrOptions?: number | ByteLengthOptionsInterface, max?: number): boolean {
    if (typeof value !== "string") {
        return false;
    }

    const options: ByteLengthOptionsInterface = typeof minOrOptions === "object" && minOrOptions !== null
        ? minOrOptions
        : { min: minOrOptions, max };

    const encoding: BufferEncoding = options.encoding || "utf8";
    const min: number = options.min ?? 0;
    const byteLength: number = Buffer.byteLength(value, encoding);

    if (byteLength < min) {
        return false;
    }

    return options.max === undefined || byteLength <= options.max;
}
