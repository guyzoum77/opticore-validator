import { ValidationSchemaInterface } from "./interfaces/validationSchema.interface";
import { ValidationResultInterface } from "./interfaces/validationResult.interface";
import { ValidationRuleInterface } from "./interfaces/validationRule.interface";
import { rulesConstant } from "./constants/rules.constant";
import { RulesType } from "./types/rules.type";
import { ValidatorOptionsInterface } from "./interfaces/validatorOptions.interface";

export class Validator {
    private readonly schema: ValidationSchemaInterface;

    constructor(schema: ValidationSchemaInterface) {
        this.schema = schema;
    }

    /**
     * @param data - the values to check, by field name.
     * @param options - `skipAbsentOptional`: do not run the rules of an absent field that is not `required`
     *                  (see ValidatorOptionsInterface). This is the rule the `validate()` middleware applies.
     */
    public validate(data: { [key: string]: any }, options: ValidatorOptionsInterface = {}): ValidationResultInterface {
        const errors: ValidationResultInterface = {};

        for (const field in this.schema) {
            const fieldRules: ValidationRuleInterface[] = this.schema[field];

            if (options.skipAbsentOptional && data[field] === undefined && !fieldRules.some((r: ValidationRuleInterface): boolean => r.rule === "required")) {
                continue;
            }

            errors[field] = [];

            for (const { rule, args = [], message } of fieldRules) {
                const validationRule: RulesType = rulesConstant[rule];
                if (!validationRule) {
                    throw new Error(`Validation rule ${rule} is not defined.`);
                }

                const isValid: boolean = validationRule(data[field], ...args);
                if (!isValid) {
                    const defaultMessage: string = `Field ${field} failed validation rule ${rule} ${args.length ? ` with arguments ${args.join(', ')}` : ''}.`;
                    errors[field].push(message || defaultMessage);
                }
            }

            if (errors[field].length === 0) {
                delete errors[field];
            }
        }

        return errors;
    }
}