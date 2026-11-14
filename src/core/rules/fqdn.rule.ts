import {IFqdnOptions} from "../interfaces/fqdnOptions.interface";

export function fqdnRule(value: any, options: IFqdnOptions = {}): boolean {
    if (typeof value !== 'string') return false;

    const defaultOptions: IFqdnOptions = {
        requireTld: true,
        allowUnderscores: false,
        allowTrailingDot: false,
    };

    const { requireTld, allowUnderscores, allowTrailingDot } = { ...defaultOptions, ...options };

    // RFC 1035: at most 253 characters (+ the optional trailing dot), labels of 1 to 63 characters. The bound also
    // caps the regex's work.
    if (value.length > (allowTrailingDot ? 254 : 253)) return false;

    // `_` is added inside the character classes: it used to be an alternative of the whole label
    // (`([a-zA-Z0-9]|_[a-zA-Z0-9-]*…\.)+`), which accepted any word without a dot and backtracked in quadratic time.
    const chars: string = allowUnderscores ? 'a-zA-Z0-9_' : 'a-zA-Z0-9';
    const fqdnRegex: RegExp = new RegExp(
        `^(?:[${chars}](?:[${chars}-]{0,61}[${chars}])?\\.)+` +
        (requireTld ? '[a-zA-Z]{2,}' : '[a-zA-Z]*') +
        (allowTrailingDot ? '\\.?' : '') +
        '$'
    );

    return fqdnRegex.test(value);
}