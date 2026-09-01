import { Command } from "commander";
import chalk from "chalk";

import { makeValidatorCommand } from "./commands/makeValidator.command";

export const VALIDATOR_VERSION = "1.1.0";

export const helpConfig = {
    sortSubcommands: true,
    styleTitle:                (str: string) => chalk.bold.hex("#427ff5")(str),
    styleUsage:                (str: string) => chalk.hex("#D4E4FF")(str),
    styleCommandText:          (str: string) => chalk.hex("#D4E4FF")(str),
    styleOptionTerm:           (str: string) => chalk.hex("#D4E4FF")(str),
    styleSubcommandTerm:       (str: string) => chalk.hex("#D4E4FF")(str),
    styleOptionDescription:    (str: string) => chalk.dim(str),
    styleSubcommandDescription:(str: string) => chalk.dim(str),
    styleCommandDescription:   (str: string) => chalk.dim(str),
};

/**
 * Some shells (npx wrappers, certain terminals) fail to report a TTY even
 * though the user is in an interactive terminal. Both chalk and Commander's
 * own color detection (Command.useColor(), which strips ANSI from the whole
 * help output when it thinks color isn't supported) fall back to isTTY
 * checks when FORCE_COLOR/NO_COLOR aren't set, so force color on by default
 * for both — explicit NO_COLOR / FORCE_COLOR from the caller still win.
 * Call this once, as early as possible, from any entry point that wants
 * colored output (a host CLI only needs to call it once for every tool it
 * embeds).
 */
export function forceOpticoreColors(): void {
    if (process.env.NO_COLOR === undefined && process.env.FORCE_COLOR === undefined) {
        process.env.FORCE_COLOR = "3";
        chalk.level = 3;
    }
}

export function handleValidatorCliError(err: unknown): void {
    const msg: string = err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("");
    console.error(
        chalk.bgRed.white.bold("  ERROR  ") +
        chalk.red(` ${msg}`)
    );
    console.error("");
    process.exit(1);
}

/**
 * Adds `make:validator` (aliases `generate`, `mv`) onto whatever Command is
 * passed — the root program when this CLI runs standalone, or a `validator`
 * subcommand when embedded in a host CLI (see registerValidatorCommand).
 */
export function attachMakeValidatorCommand(cmd: Command): void {
    cmd
        .command("make:validator")
        .aliases(["generate", "mv"])
        .description("Interactively create a validation schema file for an existing feature")
        .action(async (): Promise<void> => {
            try {
                await makeValidatorCommand();
            } catch (e) {
                handleValidatorCliError(e);
            }
        });
}

/**
 * Embeds this package's CLI as a `validator` subcommand on a host program
 * (e.g. a project's unified `opticore` CLI). Returns the created
 * subcommand so the host can call `.outputHelp()` on it directly if needed.
 */
export function registerValidatorCommand(program: Command): Command {
    const validatorProgram = program
        .command("validator")
        .description(chalk.dim("Generate validation schemas and wire the validate middleware"))
        .version(
            VALIDATOR_VERSION,
            "-v, --version",
            "Output the current version"
        )
        .configureHelp(helpConfig);

    attachMakeValidatorCommand(validatorProgram);

    return validatorProgram;
}
