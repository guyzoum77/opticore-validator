import {SValidator} from "../services/validator.service";

export function iso31661Alpha2Rule(value: any): boolean {
    if (typeof value !== "string") {
        return false;
    }

    return SValidator.ISOAlpha2Codes().has(value.toUpperCase());
}