import {IHashOptions} from "../interfaces/hashOptions.interface";

export function hashRule(value: any, options: IHashOptions): boolean {
    if (typeof value !== 'string') return false;

    // Define hash patterns for different algorithms
    const hashPatterns: { [key: string]: RegExp } = {
        md5: /^[a-f0-9]{32}$/,
        sha1: /^[a-f0-9]{40}$/,
        sha256: /^[a-f0-9]{64}$/,
        sha384: /^[a-f0-9]{96}$/,
        sha512: /^[a-f0-9]{128}$/,
        ripemd160: /^[a-f0-9]{40}$/,
        'sha3-256': /^[a-f0-9]{64}$/,
        'sha3-512': /^[a-f0-9]{128}$/,
    };

    const { algorithm } = options;
    const regex: RegExp = hashPatterns[algorithm];

    if (!regex) {
        throw new Error(`Unsupported hash algorithm: ${algorithm}`);
    }

    return regex.test(value);
}