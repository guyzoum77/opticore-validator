import {IIdentityCardOptions} from "../interfaces/identityCardOptions.interface";

export function identityCardRule(value: any, options?: IIdentityCardOptions): boolean {
    if (typeof value !== 'string') return false;

    const defaultOptions: IIdentityCardOptions = {
        country: 'any', // Default to generic validation
    };

    const { country } = { ...defaultOptions, ...options };

    // Country-specific patterns
    const patterns: { [key: string]: RegExp } = {
        US: /^[0-9]{9}$/, // Example: Social Security Number (SSN)
        FR: /^[0-9]{13}$/, // Example: French National ID
        IN: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // Example: PAN Card in India
        any: /^[A-Za-z0-9-]+$/, // Generic pattern
    };

    const regex: RegExp = patterns[country] || patterns['any'];
    return regex.test(value);
}