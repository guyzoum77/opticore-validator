export function dateTimeRule(value: any): boolean {
    const dateTimeRegex: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/;
    return dateTimeRegex.test(value);
}