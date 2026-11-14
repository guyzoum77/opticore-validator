export function dataURIRule(value: any): boolean {
    if (typeof value !== "string") return false;

    // The data part's class already contains \s: a trailing `\s*` after it made the pattern backtrack in
    // quadratic time on a long run of spaces followed by an invalid character (ReDoS) without accepting anything more.
    const dataUriRegex: RegExp = /^\s*data:([a-z]+\/[a-z0-9\-+.]+(;[a-z\-]+=[a-z0-9\-]+)?)?(;base64Rule)?,[a-z0-9!$&',()*+,;=._~:@\/?%\s-]*$/i;

    return dataUriRegex.test(value);
}