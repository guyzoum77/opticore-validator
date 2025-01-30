import {SValidator} from "../services/validator.service";

export function iso6391Rule(value: any): boolean {
    if (typeof value !== "string") {
        return false;
    }

    return SValidator.ISOCodes().has(value.toLowerCase());
}