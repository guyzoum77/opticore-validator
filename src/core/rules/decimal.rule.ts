import {IDecimalOptions} from "../interfaces/decimal.interface";

export function decimalRule(value: any, options?: IDecimalOptions): boolean {
    if (typeof value !== 'string') {
        return false;
    }

    const defaultOptions: IDecimalOptions = {
        forceDecimal: false,
        decimalPlaces: undefined,
        locale: 'en-US',
    };

    const { forceDecimal, decimalPlaces, locale } = { ...defaultOptions, ...options };

    // Define decimal separator based on locale
    const decimalSeparator: string = locale === 'fr-FR' ? ',' : '.';
    const decimalRegex: string = decimalPlaces
        ? `{${Math.min(...decimalPlaces)},${Math.max(...decimalPlaces)}}`
        : '+';

    // Construct regex for validating decimals
    const regexPattern: string = forceDecimal
        ? `^-?\\d+\\${decimalSeparator}\\d${decimalRegex}$` // Require decimal point
        : `^-?\\d+(?:\\${decimalSeparator}\\d${decimalRegex})?$`; // Optional decimal point

    const regex: RegExp = new RegExp(regexPattern);
    return regex.test(value);
}