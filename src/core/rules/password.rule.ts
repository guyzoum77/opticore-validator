export function passwordRule(value: any): boolean {
    if (typeof value !== 'string') return false;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    // Minimum eight characters, at least one letter and one number
    return passwordRegex.test(value);
}
  