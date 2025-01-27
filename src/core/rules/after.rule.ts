import {IAfterOptions} from "../interfaces/afterOptions.interface";

export function afterRule(value: any, { date = new Date(0).toISOString(), format }: IAfterOptions = {}): boolean {
    if (typeof value !== 'string') return false;

    try {
        const inputDate = new Date(value);
        const comparisonDate = new Date(date!);

        if (isNaN(inputDate.getTime()) || isNaN(comparisonDate.getTime())) {
            return false; // Invalid dates
        }

        return inputDate > comparisonDate;
    } catch (error) {
        console.error('Error in isAfter rule:', error);
        return false;
    }
}

