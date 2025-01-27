export interface IFqdnOptions {
    requireTld?: boolean; // Whether to require a top-level domain (e.g., '.com')
    allowUnderscores?: boolean; // Whether to allow underscores in the domain
    allowTrailingDot?: boolean; // Whether to allow a trailing dot
}