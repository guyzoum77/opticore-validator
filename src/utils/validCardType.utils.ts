/**
 *
 * @param value
 *
 * validCardTypeUtils(value: string) is a function that Validates the card type based on the card number prefix (simplified example).
 * Example: Implement logic to validate card type (Visa, MasterCard, etc.)
 * This is a simplified example. Replace it with actual implementation based on card issuer rules.
 *
 */
export function validCardTypeUtils(value: string): boolean {
    if (value.startsWith('4') && value.length === 16) {
        return true; // Visa
    } else if (value.startsWith('5') && value.length === 16) {
        return true; // MasterCard
    } else {
        return false;
    }
}