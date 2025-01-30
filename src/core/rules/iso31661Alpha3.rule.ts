import {SValidator} from "../services/validator.service";

export function iso31661Alpha3Rule(value: any): boolean {
    if (typeof value !== "string") {
        return false;
    }

    return SValidator.ISOAlpha3Codes().has(value.toUpperCase());
}