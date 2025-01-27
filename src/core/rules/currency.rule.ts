import {CurrencyOptionsInterface} from "../interfaces/currencyOptions.interface";

/**
 *
 * @param value
 * @param options
 *
 * The currency function now accepts an option parameter of type CurrencyOptions.
 *
 * CurrencyOptions includes various properties to configure the validation of currency strings,
 * such as symbol requirements, negative number formats, decimal handling, and separators.
 *
 * Inside the function, defaultOptions are set based on provided options or default values.
 *
 * The function begins to construct a regex pattern (regexPattern) based on the specified options,
 * but this requires further implementation based on your exact validation needs.
 *
 * Regex Pattern Construction: The currency function constructs a regex pattern (regexPattern)
 * step-by-step based on the provided CurrencyOptions.
 *
 * Options Handling: Each option (symbol, allow_negatives, thousands_separator, etc.) affects how the regex pattern
 * is built to match the desired currency format.
 *
 * Symbol Position Handling: Added symbol_position property to CurrencyOptions to specify whether the currency symbol
 * should be a prefix ('prefix') or suffix ('suffix').
 *
 * Regex Construction: Depending on symbol_position, constructs the regex pattern (regexPattern) to either start with
 * the symbol (prefix) or end with it (suffix).
 *
 * Symbol After Digits: If symbol_position is 'suffix' and symbol_after_digits is true, places the symbol after the
 * digits part of the regex pattern.
 *
 * Validation: Use the constructed regex pattern (regexPattern) to create a RegExp object and validate value against it.
 *
 */
export function currencyRule(value: any, options?: CurrencyOptionsInterface): boolean {
    if (typeof value !== 'string') return false;

    const defaultOptions: CurrencyOptionsInterface = {
        symbol: options?.symbol || '$',
        symbol_position: options?.symbol_position || 'prefix',
        require_symbol: options?.require_symbol || false,
        allow_space_after_symbol: options?.allow_space_after_symbol || false,
        symbol_after_digits: options?.symbol_after_digits || false,
        allow_negatives: options?.allow_negatives || true,
        parens_for_negatives: options?.parens_for_negatives || false,
        negative_sign_before_digits: options?.negative_sign_before_digits || false,
        negative_sign_after_digits: options?.negative_sign_after_digits || false,
        allow_negative_sign_placeholder: options?.allow_negative_sign_placeholder || false,
        thousands_separator: options?.thousands_separator || ',',
        decimal_separator: options?.decimal_separator || '.',
        allow_decimal: options?.allow_decimal || true,
        require_decimal: options?.require_decimal || false,
        digits_after_decimal: options?.digits_after_decimal || [2],
        allow_space_after_digits: options?.allow_space_after_digits || false,
    };
    const {
        symbol,
        symbol_position,
        require_symbol,
        allow_space_after_symbol,
        symbol_after_digits,
        allow_negatives,
        parens_for_negatives,
        negative_sign_before_digits,
        negative_sign_after_digits,
        allow_negative_sign_placeholder,
        thousands_separator,
        decimal_separator,
        allow_decimal,
        require_decimal,
        digits_after_decimal,
        allow_space_after_digits,
    } = defaultOptions;

    let escapedSymbol;
    let escapedThousandsSeparator;
    let escapedDecimalSeparator;

    // Escape special characters in symbol and separators for regex
    if (symbol != null) {
        escapedSymbol = symbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    if (thousands_separator != null) {
        escapedThousandsSeparator = thousands_separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    if (decimal_separator != null) {
        escapedDecimalSeparator = decimal_separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Build a regex pattern based on options
    let regexPattern = '^';

    // Symbol part
    if (symbol_position === 'prefix') {
        if (require_symbol) {
            regexPattern += `${escapedSymbol}${allow_space_after_symbol ? '\\s*' : ''}`;
        } else {
            regexPattern += `(?:${escapedSymbol}${allow_space_after_symbol ? '\\s*' : ''})?`;
        }
    }

    // Negative sign handling
    if (allow_negatives) {
        if (parens_for_negatives) {
            regexPattern += "\\(";
        } else if (negative_sign_before_digits) {
            regexPattern += "-";
        } else if (negative_sign_after_digits) {
            regexPattern += "(?:-)?";
        }
    }

    // Main digits part
    regexPattern += "\\d{1,3}(?:";

    // Thousands separator handling
    if (thousands_separator) {
        regexPattern += `${escapedThousandsSeparator}\\d{3})*`;
    }

    // Decimal part
    if (allow_decimal && decimal_separator && digits_after_decimal) {
        regexPattern += `(?:${escapedDecimalSeparator}\\d{${digits_after_decimal.join(",")}})?`;
    }

    // Symbol part after digits
    if (symbol_position === "suffix" && symbol_after_digits) {
        regexPattern += `${allow_space_after_symbol ? "\\s*" : ""}${escapedSymbol}`;
    }

    // Close negative sign part if needed
    if (allow_negatives && parens_for_negatives) {
        regexPattern += "\\)";
    }

    // End of a pattern
    regexPattern += defaultOptions.symbol;

    try {
        // Create regex object
        const regex: RegExp = new RegExp(regexPattern);

        // Validate against regex
        return regex.test(value);
    } catch (error) {
        console.error("Invalid regex pattern:", error);
        return false;
    }
}