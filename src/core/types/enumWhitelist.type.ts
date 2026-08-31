/**
 * Field -> allowed-values whitelist. Kept separate from ValidationSchemaInterface
 * because `in` (see in.rule.ts) validates an ISIN security code, not membership
 * in an arbitrary list, so closed enums (role, status, ...) are checked here
 * instead and merged into the same validate() error bag.
 */
export type EnumWhitelist = Record<string, readonly string[]>;
