import {IFqdnOptions} from "../interfaces/fqdnOptions.interface";

export function fqdnRule(value: any, options: IFqdnOptions = {}): boolean {
    if (typeof value !== 'string') return false;

    const defaultOptions: IFqdnOptions = {
        requireTld: true,
        allowUnderscores: false,
        allowTrailingDot: false,
    };

    const { requireTld, allowUnderscores, allowTrailingDot } = { ...defaultOptions, ...options };

    const fqdnRegex: RegExp = new RegExp(
        `^([a-zA-Z0-9]${allowUnderscores ? '|_' : ''}[a-zA-Z0-9-]*[a-zA-Z0-9]\\.)+` +
        (requireTld ? '[a-zA-Z]{2,}' : '[a-zA-Z]*') +
        (allowTrailingDot ? '\\.?' : '') +
        '$'
    );

    return fqdnRegex.test(value);
}