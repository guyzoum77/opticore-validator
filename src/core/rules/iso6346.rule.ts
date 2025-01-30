import {SValidator} from "../services/validator.service";

export function iso6346Rule(value: any): boolean {
    if (typeof value !== "string") {
        return false;
    }

    const regex: RegExp = /^[A-Z]{3}[UJZ]\d{6}\d$/;
    if (!regex.test(value)) {
        return false;
    }

    return SValidator.validateISO6346Checksum(value);
}