import {ValidationSchemaInterface} from "./interfaces/validationSchema.interface";
import {ValidationResultInterface} from "./interfaces/validationResult.interface";
import {ValidationRuleInterface} from "./interfaces/validationRule.interface";
import {rulesConstant} from "./constants/rules.constant";

export class Validator {
    private readonly schema: ValidationSchemaInterface;

    constructor(schema: ValidationSchemaInterface) {
        this.schema = schema;
    }

    public validate(data: { [key: string]: any }): ValidationResultInterface {
        const errors: ValidationResultInterface = {};

        for (const field in this.schema) {
            const fieldRules: ValidationRuleInterface[] = this.schema[field];
            errors[field] = [];

            for (const { rule, args = [], message } of fieldRules) {
                const validationRule = rulesConstant[rule];
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