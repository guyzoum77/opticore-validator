import type { Request, Response, NextFunction } from "opticore-express";
import { ResponseHandler, HttpStatusCode } from "opticore-http-response";
import { Validator } from "../validator.core";
import { ValidationResultInterface } from "../interfaces/validationResult.interface";
import { ValidationRuleInterface } from "../interfaces/validationRule.interface";
import { ValidationSchemaInterface } from "../interfaces/validationSchema.interface";
import { EnumWhitelist } from "../types/enumWhitelist.type";

export interface ValidateOptions {
    apiVersion?: string;
    onValidationFailed?: (context: { method: string; url: string; errors: ValidationResultInterface }) => void;
}

/**
 * validate — Express middleware factory that runs `req.body` through a
 * ValidationSchemaInterface (plus an optional EnumWhitelist for closed
 * enums) and short-circuits with 400 + field errors before the request
 * reaches the controller.
 *
 * The Validator core has no notion of an "optional" field: every rule in a
 * field's list runs even when the field is absent, so a schema entry for
 * an optional field (no `required` rule) would still fail on `undefined`.
 * To keep schemas expressing "if present, must look like this", fields
 * missing from the payload are skipped unless the schema marks them
 * `required`. The same rule applies to the enum whitelist.
 */
export function validate(
    schema: ValidationSchemaInterface,
    enums: EnumWhitelist = {},
    options: ValidateOptions = {},
) {
    return (req: Request, res: Response, next: NextFunction): void => {
        const data: any = req.body ?? {};
        const effectiveSchema: ValidationSchemaInterface = {};

        for (const field of Object.keys(schema)) {
            const rules = schema[field] as ValidationRuleInterface[];
            const isRequired: boolean = rules.some((r: ValidationRuleInterface): boolean => r.rule === "required");
            if (data[field] === undefined && !isRequired) {
                continue;
            }
            effectiveSchema[field] = rules;
        }

        const validator = new Validator(effectiveSchema);
        const errors: ValidationResultInterface = validator.validate(data);

        for (const field of Object.keys(enums)) {
            const allowedValues = enums[field] as readonly string[];
            const value = data[field];
            if (value === undefined || allowedValues.includes(value)) {
                continue;
            }
            errors[field] = errors[field] ?? [];
            errors[field].push(`Field ${field} must be one of: ${allowedValues.join(", ")}.`);
        }

        if (Object.keys(errors).length > 0) {
            options.onValidationFailed?.({ method: req.method, url: req.originalUrl, errors });

            res.status(HttpStatusCode.BAD_REQUEST).json(
                ResponseHandler.error(
                    "Validation failed",
                    HttpStatusCode.BAD_REQUEST,
                    errors,
                    options.apiVersion ?? null,
                ),
            );
            return;
        }

        next();
    };
}
