export function emptyRule(value: any): boolean {
    // Check for null or undefined
    if (value === null || value === undefined) {
        return true;
    }

    // Check for string or array with zero lengths
    if ((typeof value === 'string' || Array.isArray(value)) && value.length === 0) {
        return true;
    }

    // If the value is an object, check for no keys
    if (typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(value).length === 0;
    }

    return false;
}
