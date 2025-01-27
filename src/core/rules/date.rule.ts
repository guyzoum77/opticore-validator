import {isValid, parse} from "date-fns";
import {DateOptionsInterface} from "../interfaces/dateOptions.interface";


export function dateRule(value: any, options?: DateOptionsInterface): boolean {
    let delimiterPattern;
    if (typeof value !== "string") {
        return false;
    }

    const defaultOptions: DateOptionsInterface = {
        format: options?.format || "yyyy-MM-dd",
        strictMode: options?.strictMode || false,
        delimiters: options?.delimiters || ["-", "/"]
    };
    const { format, strictMode, delimiters } = defaultOptions;

    // Build a dynamic regex pattern based on delimiters
    if (delimiters) {
        delimiterPattern = delimiters.map((d: string): string => `\\${d}`).join("|");
    }
    const regex: RegExp = new RegExp(`^\\d{4}${delimiterPattern}\\d{2}${delimiterPattern}\\d{2}$`);

    // If strict mode is enabled, ensure the date string matches the format exactly
    if (strictMode && !regex.test(value)) {
        return false;
    } else {
        // Parse the date using the provided format
        const parsedDate: Date = parse(value, format!, new Date());
        return isValid(parsedDate);
    }
}