import {IBeforeOptions} from "../interfaces/beforeOptions.interface";
import {SValidator} from "../services/validator.service";

export function beforeRule(value: any, options?: IBeforeOptions): boolean {
    if (typeof value !== 'string') return false;

    const defaultOptions: IBeforeOptions = {
        date: new Date().toISOString(), // Default to the current date
        format: undefined, // No specific format by default
    };

    const { date, format } = { ...defaultOptions, ...options };

    try {
        // Parse the given date and the comparison date
        const inputDate = format ? SValidator.parseDate(value, format) : new Date(value);
        const comparisonDate = format ? SValidator.parseDate(date!, format) : new Date(date!);

        if (isNaN(inputDate.getTime()) || isNaN(comparisonDate.getTime())) {
            return false; // Invalid date
        }

        // Check if the input date is before the comparison date
        return inputDate < comparisonDate;
    } catch (error) {
        console.error('Error in isBefore rule:', error);
        return false;
    }
}