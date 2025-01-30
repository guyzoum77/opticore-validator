import {SValidator} from "../services/validator.service";

export function iso4217Rule(value: any): boolean {
    if (typeof value !== "string") return false;
    return SValidator.ISOCurrencies().has(value.toUpperCase());
}