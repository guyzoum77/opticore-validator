import {BooleanOptionsInterface} from "../interfaces/booleanOptions.interface";

/**
 *
 * @param value
 * @param options
 *
 * The booleanRule function is validating if a given value is a boolean: a real boolean (JSON body) or a string representation.
 * It supports two modes:
 * Strict matching (default): Matches ['true', 'false', '0', '1'].
 * Loose matching (if a loose option is true): Also matches ['yes', 'no', 'True', 'False']
 * and any valid boolean string of any case.
 *
 * The option parameter allows customization: loose: Specifies whether to allow loose matching of boolean values.
 * Defaults to false.
 */
export function booleanRule(value: any, options?: BooleanOptionsInterface): boolean {
    // A JSON body carries real booleans (`{ "rememberMe": true }`); only their string forms used to be accepted.
    if (typeof value === "boolean") return true;
    if (typeof value !== "string") return false;

    const defaultOptions: BooleanOptionsInterface = { loose: options?.loose || false };

    const { loose } = defaultOptions;

    // Strict boolean values (case-sensitive)
    const strictValues: string[] = ["true", "false", "0", "1"];
    if (loose) {
        // Loose boolean values (case-insensitive)
        const looseValues: string[] = [...strictValues, "yes", "no", "true", "false"];

        return looseValues.includes(value.toLowerCase());
    } else {
        return strictValues.includes(value);
    }
}
