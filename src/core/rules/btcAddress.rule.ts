export function btcAddressRule(value: any): boolean {
    return typeof value === "string" && /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/.test(value);
}