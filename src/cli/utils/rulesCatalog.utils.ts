import chalk from "chalk";
import { rulesConstant } from "../../core/constants/rules.constant";

export const RULE_NAMES: string[] = Object.keys(rulesConstant).sort();

export function isKnownRule(rule: string): boolean {
    return RULE_NAMES.includes(rule);
}

export function printRulesTable(): void {
    const col: number = Math.max(...RULE_NAMES.map((r) => r.length)) + 2;
    const perRow = 3;
    const sep: string = chalk.dim("-".repeat(col * perRow + perRow));

    console.log("");
    console.log(chalk.bold.yellow(" Available rules") + chalk.dim(`  (${RULE_NAMES.length})`));
    console.log(sep);
    for (let i = 0; i < RULE_NAMES.length; i += perRow) {
        const row: string[] = RULE_NAMES.slice(i, i + perRow);
        console.log(" " + row.map((r) => chalk.green(r.padEnd(col))).join(""));
    }
    console.log(sep);
    console.log("");
}
