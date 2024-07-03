import {ValidationRuleInterface} from "./validationRule.interface";

export interface ValidationSchemaInterface {
    [field: string]: ValidationRuleInterface[];
}