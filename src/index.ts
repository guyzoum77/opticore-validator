import {Validator} from "./core/validator.core";
import {validate} from "./core/services/validate.middleware";

export { type ValidationResultInterface } from "./core/interfaces/validationResult.interface";
export { type ValidationRuleInterface, type ValidationRuleInterface as ValidationRule } from "./core/interfaces/validationRule.interface";
export { type ValidationSchemaInterface, type ValidationSchemaInterface as ValidationSchema } from "./core/interfaces/validationSchema.interface";
export { type EnumWhitelist } from "./core/types/enumWhitelist.type";
export { type ValidateOptions } from "./core/services/validate.middleware";

export {
    Validator,
    validate
};