export function urlRule(value: any): boolean {
    const urlRegex: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(value);
}