export interface ValidatorOptionsInterface {
    /**
     * Skip a field that is absent (`undefined`) and whose rules do not include `required`, so that a schema entry
     * without `required` means "if present, it must look like this". Off by default: without it every rule of every
     * field runs, absent or not, and an optional field would fail on `undefined`.
     */
    skipAbsentOptional?: boolean;
}
