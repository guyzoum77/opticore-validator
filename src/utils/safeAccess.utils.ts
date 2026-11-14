/**
 * Reads `field` from an untrusted payload without falling through to Object.prototype: a field named
 * `constructor`, `toString`, `__proto__`… that the payload does not carry reads as `undefined` instead of an
 * inherited member (which would, for instance, satisfy a `required` rule the client never fulfilled).
 * Properties provided by another prototype (class instances with getters) are still read.
 *
 * @param data
 * @param field
 */
export function readField(data: unknown, field: string): any {
    if (data === null || data === undefined) {
        return undefined;
    }
    const target: any = data;
    if (Object.hasOwn(target, field)) {
        return target[field];
    }
    if (field in Object.prototype) {
        return undefined;
    }

    return target[field];
}

/**
 * Appends a message to the error list of `field`, defining it as an own data property: a schema or whitelist
 * field named `__proto__` must land in the result instead of replacing the prototype of the error bag (which
 * silently dropped the error, i.e. let an invalid payload pass).
 *
 * @param errors
 * @param field
 * @param message
 */
export function pushError(errors: { [field: string]: string[] }, field: string, message: string): void {
    if (!Object.hasOwn(errors, field)) {
        Object.defineProperty(errors, field, { value: [], writable: true, enumerable: true, configurable: true });
    }
    errors[field].push(message);
}
