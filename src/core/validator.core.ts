import { ValidationSchemaInterface } from "./interfaces/validationSchema.interface";
import { ValidationResultInterface } from "./interfaces/validationResult.interface";
import { ValidationRuleInterface } from "./interfaces/validationRule.interface";
import { rulesConstant } from "./constants/rules.constant";
import { RulesType } from "./types/rules.type";
import { ValidatorOptionsInterface } from "./interfaces/validatorOptions.interface";
import { pushError, readField } from "../utils/safeAccess.utils";

export class Validator {
    private readonly schema: ValidationSchemaInterface;

    constructor(schema: ValidationSchemaInterface) {
        this.schema = schema;
    }

    /**
     * Only the schema's own fields are checked, and only the payload's own values (or values of a non-Object
     * prototype) are read: a payload can never satisfy a rule through an inherited Object.prototype member, and a
     * field named `__proto__` reports its errors like any other field. A `null`/`undefined` payload is validated as
     * an empty one.
     *
     * @param data - the values to check, by field name.
     * @param options - `skipAbsentOptional`: do not run the rules of an absent field that is not `required`
     *                  (see ValidatorOptionsInterface). This is the rule the `validate()` middleware applies.
     */
    public validate(data: { [key: string]: any }, options: ValidatorOptionsInterface = {}): ValidationResultInterface {
        const errors: ValidationResultInterface = {};

        for (const field of Object.keys(this.schema)) {
            const fieldRules: ValidationRuleInterface[] = this.schema[field];
            const value: any = readField(data, field);

            if (options.skipAbsentOptional && value === undefined && !fieldRules.some((r: ValidationRuleInterface): boolean => r.rule === "required")) {
                continue;
            }

            for (const { rule, args = [], message } of fieldRules) {
                const validationRule: RulesType | undefined = Object.hasOwn(rulesConstant, rule) ? rulesConstant[rule] : undefined;
                if (!validationRule) {
                    throw new Error(`Validation rule ${rule} is not defined.`);
                }

                const isValid: boolean = validationRule(value, ...args);
                if (!isValid) {
                    const defaultMessage: string = `Field ${field} failed validation rule ${rule} ${args.length ? ` with arguments ${args.join(', ')}` : ''}.`;
                    pushError(errors, field, message || defaultMessage);
                }
            }
        }

        return errors;
    }
}
