import * as path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import colors from "ansi-colors";
import { intro, outro, select, text, confirm, isCancel, cancel, log } from "@clack/prompts";
import { listFeatures, featureValidatorsDir } from "../utils/features.utils";
import { isKnownRule, printRulesTable } from "../utils/rulesCatalog.utils";

interface RuleEntry {
    rule: string;
    argsSource?: string;
    message?: string;
}

type SchemaFields = Record<string, RuleEntry[]>;

function cancelOp(): void {
    cancel(colors.bgRed(colors.white("  Operation cancelled  ")));
    process.exit(130);
}

function toCamelCase(input: string): string {
    const words: string[] = input.trim().split(/[^a-zA-Z0-9]+/).filter(Boolean);
    if (words.length === 0) {
        return input;
    }

    return words
        .map((w, i) => i === 0
            ? w.charAt(0).toLowerCase() + w.slice(1)
            : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join("");
}

async function promptFieldRules(fieldName: string): Promise<RuleEntry[]> {
    const rules: RuleEntry[] = [];

    while (true) {
        let ruleName: string | null = null;

        while (true) {
            const ruleInput = await text({
                message: `Rule for ${chalk.white(fieldName)}` + chalk.dim(" (enter ? to list all rules, leave empty to stop):"),
            });
            if (isCancel(ruleInput)) {
                cancelOp(); return [];
            }
            const r: string = (ruleInput as string).trim();

            if (r === "?") {
                printRulesTable(); continue;
            }

            if (r === "") {
                ruleName = null; break;
            }

            if (isKnownRule(r)) {
                ruleName = r; break;
            }

            log.error(`Unknown rule "${r}". Enter ? to see all available rules.`);
        }

        if (!ruleName) {
            if (rules.length === 0) {
                log.warn("A field needs at least one rule.");
                continue;
            }
            break;
        }

        const argsInput = await text({
            message: "Arguments" + chalk.dim(' — full array literal, e.g. [2] or [{ date: "2024-01-01T00:00:00Z" }] (leave empty for none):'),
        });
        if (isCancel(argsInput)) {
            cancelOp(); return [];
        }

        let argsSource: string = (argsInput as string).trim();

        if (argsSource && !argsSource.startsWith("[")) {
            argsSource = `[${argsSource}]`;
        }

        const messageInput = await text({ message: "Custom error message (optional):" });
        if (isCancel(messageInput)) {
            cancelOp(); return [];
        }
        const message: string = (messageInput as string).trim();

        rules.push({ rule: ruleName, argsSource: argsSource || undefined, message: message || undefined });
        log.success(chalk.green("rule ") + chalk.white.bold(ruleName) + chalk.green(" added."));

        const more = await confirm({ message: `Add another rule for ${fieldName}?`, initialValue: false });
        if (isCancel(more)) {
            cancelOp(); return [];
        }
        if (!more) {
            break;
        }
    }

    return rules;
}

async function promptSchemaFields(schemaKey: string): Promise<SchemaFields> {
    const fields: SchemaFields = {};
    log.info(chalk.dim(`Add fields for ${schemaKey}Schema. Leave the field name empty to stop.`));

    while (true) {
        const nameInput = await text({ message: chalk.dim("Field name (leave empty to stop):") });
        if (isCancel(nameInput)) {
            cancelOp(); return {};
        }
        const fieldName: string = (nameInput as string).trim();
        if (fieldName === "") {
            break;
        }

        const rules: RuleEntry[] = await promptFieldRules(fieldName);
        fields[fieldName] = rules;
        log.success(chalk.green("field ") + chalk.white.bold(fieldName) + chalk.dim(` (${rules.length} rule(s))`) + chalk.green(" added."));
    }

    return fields;
}

async function promptSchemas(): Promise<Map<string, SchemaFields>> {
    const schemas = new Map<string, SchemaFields>();
    log.info(chalk.dim("Define one or more schemas (e.g. register, login). Leave the name empty to stop."));

    while (true) {
        const nameInput = await text({ message: chalk.dim("Schema name (leave empty to stop):") });
        if (isCancel(nameInput)) {
            cancelOp(); return new Map();
        }
        const raw: string = (nameInput as string).trim();

        if (raw === "") {
            if (schemas.size === 0) {
                log.warn("You must define at least one schema.");
                continue;
            }
            break;
        }

        const schemaKey: string = toCamelCase(raw);
        const fields: SchemaFields = await promptSchemaFields(schemaKey);
        schemas.set(schemaKey, fields);
        log.success(chalk.green("schema ") + chalk.white.bold(`${schemaKey}Schema`) + chalk.green(" added."));
    }

    return schemas;
}

async function promptEnums(): Promise<Record<string, string[]>> {
    const enums: Record<string, string[]> = {};

    const wantEnums = await confirm({
        message: "Add an enum whitelist? (closed fields like role/status)",
        initialValue: false,
    });
    if (isCancel(wantEnums)) {
        cancelOp(); return {};
    }

    if (!wantEnums) {
        return enums;
    }

    while (true) {
        const fieldInput = await text({ message: "Enum field name (leave empty to stop):" });
        if (isCancel(fieldInput)) {
            cancelOp(); return {};
        }

        const field: string = (fieldInput as string).trim();
        if (field === "") {
            break;
        }

        const valuesInput = await text({ message: `Allowed values for ${field}` + chalk.dim(" (comma-separated):") });
        if (isCancel(valuesInput)) {
            cancelOp(); return {};
        }
        const values: string[] = (valuesInput as string).split(",").map((v) => v.trim()).filter(Boolean);

        if (values.length === 0) {
            log.error("At least one value is required.");
            continue;
        }

        enums[field] = values;
        log.success(chalk.green("enum ") + chalk.white.bold(field) + chalk.dim(` [${values.join(", ")}]`) + chalk.green(" added."));

        const more = await confirm({ message: "Add another enum field?", initialValue: false });
        if (isCancel(more)) {
            cancelOp(); return {};
        }
        if (!more) {
            break;
        }
    }

    return enums;
}

function renderRule(entry: RuleEntry, indent: string): string {
    const parts: string[] = [`rule: ${JSON.stringify(entry.rule)}`];
    if (entry.argsSource) {
        parts.push(`args: ${entry.argsSource}`);
    }
    if (entry.message) {
        parts.push(`message: ${JSON.stringify(entry.message)}`);
    }
    return `${indent}{ ${parts.join(", ")} },`;
}

function renderSchema(schemaKey: string, fields: SchemaFields): string {
    const lines: string[] = [`export const ${schemaKey}Schema: ValidationSchema = {`];
    for (const [field, rules] of Object.entries(fields)) {
        lines.push(`    ${field}: [`);
        for (const rule of rules) {
            lines.push(renderRule(rule, "        "));
        }
        lines.push("    ],");
    }
    lines.push("};");
    return lines.join("\n");
}

function renderEnums(validatorName: string, enums: Record<string, string[]>): string {
    const lines: string[] = [`export const ${validatorName}Enums: EnumWhitelist = {`];
    for (const [field, values] of Object.entries(enums)) {
        lines.push(`    ${field}: [${values.map((v) => JSON.stringify(v)).join(", ")}],`);
    }
    lines.push("};");
    return lines.join("\n");
}

function renderFile(validatorName: string, schemas: Map<string, SchemaFields>, enums: Record<string, string[]>): string {
    const blocks: string[] = [`import { EnumWhitelist, ValidationSchema } from "opticore-validator";`, ""];

    if (Object.keys(enums).length > 0) {
        blocks.push(renderEnums(validatorName, enums));
        blocks.push("");
    }

    for (const [schemaKey, fields] of schemas) {
        blocks.push(renderSchema(schemaKey, fields));
        blocks.push("");
    }

    return blocks.join("\n").replace(/\n+$/, "\n");
}

function nextStepsMessage(schemas: Map<string, SchemaFields>, featureName: string, validatorName: string): string {
    const [firstSchema] = schemas.keys();
    const schemaExport: string = firstSchema ? `${firstSchema}Schema` : "yourSchema";

    return "\n  Next step:\n" +
        `  ${chalk.dim("import")} { validate } ${chalk.dim("from")} ${chalk.green('"opticore-validator"')};\n` +
        `  ${chalk.dim("import")} { ${schemaExport} } ${chalk.dim("from")} ${chalk.green(`"../application/validators/${validatorName}.validator"`)};\n\n` +
        `  router.post(${chalk.green('"/path"')}, validate(${schemaExport}), controller);\n` +
        `\n  ${chalk.dim(`(relative to src/features/${featureName}/infrastructure/routes)`)}\n`;
}

export async function makeValidatorCommand(): Promise<void> {
    intro(chalk.bgHex("#427ff5").white("  Opticore Validator — make:validator  "));

    const projectRoot: string = process.cwd();
    const features: string[] = listFeatures(projectRoot);

    if (features.length === 0) {
        log.error("No feature found under src/features.");
        log.info(chalk.dim("You must create a feature first (e.g. src/features/user) before a validator can be generated."));
        process.exit(1);
    }

    const featureName = await select<string>({
        message: "Which feature is this validator for?",
        options: features.map((f) => ({ label: f, value: f })),
    });
    if (isCancel(featureName)) { cancelOp(); return; }

    const nameInput = await text({
        message: "Validator name (camelCase):" + chalk.dim(" e.g. auth, user, resetPassword"),
        validate: (v) => v && /^[a-z][a-zA-Z0-9]*$/.test(v.trim()) ? undefined : "camelCase format required (e.g. auth, resetPassword)",
    });
    if (isCancel(nameInput)) {
        cancelOp(); return;
    }
    const validatorName: string = (nameInput as string).trim();

    const enums: Record<string, string[]> = await promptEnums();
    const schemas: Map<string, SchemaFields> = await promptSchemas();

    const fileContent: string = renderFile(validatorName, schemas, enums);

    log.info(chalk.green("Preview:"));
    console.log("");
    fileContent.split("\n").forEach((line: string) => console.log("  " + chalk.dim(line)));
    console.log("");

    const writeFile = await confirm({ message: "Write file?", initialValue: true });
    if (isCancel(writeFile)) {
        cancelOp(); return;
    }
    if (!writeFile) {
        cancel(colors.bgCyan(colors.white("  Cancelled — no file written.  ")));
        return;
    }

    const validatorsDir: string = featureValidatorsDir(projectRoot, featureName as string);
    fs.ensureDirSync(validatorsDir);
    const filePath: string = path.join(validatorsDir, `${validatorName}.validator.ts`);

    if (fs.existsSync(filePath)) {
        const overwrite = await confirm({
            message: `${path.relative(projectRoot, filePath)} already exists. Overwrite?`,
            initialValue: false,
        });
        if (isCancel(overwrite)) {
            cancelOp(); return;
        }
        if (!overwrite) {
            cancel(colors.bgCyan(colors.white("  Cancelled — file already exists.  ")));
            return;
        }
    }

    fs.writeFileSync(filePath, fileContent, "utf-8");
    log.success(chalk.green("created: ") + path.relative(projectRoot, filePath));

    outro(nextStepsMessage(schemas, featureName as string, validatorName));
}
