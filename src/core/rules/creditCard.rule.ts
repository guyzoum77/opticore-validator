import {CreditCardOptionsInterface} from "../interfaces/creditCardOptions.interface";
import {validLuhnUtils} from "../../utils/validLuhn.utils";
import {validCardTypeUtils} from "../../utils/validCardType.utils";

/**
 *
 * @param value
 * @param options
 *
 * The creditCardRule function now accepts an option parameter of type CreditCardOptions.
 *
 * CreditCardOptions includes min and max properties
 * to specify the minimum and maximum length constraints for the credit card number.
 *
 * Inside the function, length constraints are checked using min and max values provided in options.
 * The function cleans the input value by removing non-digit characters (\D/g) before checking its length.
 *
 * Luhn algorithm validation (validLuhnUtils).
 * Card type validation (validCardTypeUtils).
 *
 */
export function creditCardRule(value: any, options?: CreditCardOptionsInterface): boolean {
    if (typeof value !== "string") {
        return false;
    }

    // Remove non-digit characters
    const cleanedValue: string = value.replace(/\D/g, "");

    const defaultOptions: CreditCardOptionsInterface = {
        min: options?.min ?? 0,
        max: options?.max,
    };

    const { min, max } = defaultOptions;

    // Check if cleanedValue length is within min and max constraints
    const length: number = cleanedValue.length;

    if (min !== undefined && length < min) {
        return false;
    }

    if (max !== undefined && length > max) {
        return false;
    }

    if (!validLuhnUtils(cleanedValue)) {
        return false;
    }

    if (!validCardTypeUtils(cleanedValue)) {
        return false;
    }

    return true;
}
  