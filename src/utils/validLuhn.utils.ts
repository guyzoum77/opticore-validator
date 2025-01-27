/**
 *
 * @param value
 *
 * validLuhnUtils(value: string) is a function that checks if the credit card number passes the Luhn algorithm validation.
 */
export function validLuhnUtils(value: string): boolean {
    let sum: number = 0;
    let shouldDouble: boolean = false;
    for (let i = value.length - 1; i >= 0; i--) {
        let digit: number = parseInt(value.charAt(i), 10);
        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return (sum % 10) === 0;
}