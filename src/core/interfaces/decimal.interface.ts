export interface IDecimalOptions {
    forceDecimal?: boolean; // Require the number to have a decimal point
    decimalPlaces?: number[]; // Specify allowed decimal places (e.g., [1, 2] for 1 or 2 decimal places)
    locale?: "en-US" | "en-GB" | "fr-FR" | "es-ES" | "ar-SA" | "de-DE" | "ru-RU" | "zh-CN"; // Support locale-specific formats (e.g., "," vs ".")
}