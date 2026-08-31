#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import cfonts from "cfonts";

import { makeValidatorCommand } from "./commands/makeValidator.command";

function printBanner(): void {
    cfonts.say("OpticoreJs Validator", {
        font: "block",
        align: "left",
        colors: ["yellow", "#FF6B35"],
        background: "transparent",
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: "0",
    });

    const orange = chalk.bold.hex("#FF6B35");
    const dim    = chalk.bold.yellow;

    console.log(` ${orange("O P T I C O R E J S  V A L I D A T O R")}`);
    console.log(` ${dim("Schema validation & Express middleware for Opticore projects")}\n`);
    console.log(` ${chalk.bold.dim("Documentation")}  ${chalk.underline.cyan("https://github.com/guyzoum77/opticore-validator")}\n`);
}

function handleError(err: unknown): void {
    const msg: string = err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("");
    console.error(
        chalk.bgRed.white.bold("  ERROR  ") +
        chalk.red(` ${msg}`)
    );
    console.error("");
    process.exit(1);
}

printBanner();

const program = new Command();
program
    .name("opticore-validator")
    .description(chalk.dim("Generate validation schemas and wire the validate middleware"))
    .version(
        "1.0.0",
        "-v, --version",
        "Output the current version"
    )
    .configureHelp({
        sortSubcommands: true,
        styleTitle:                (str: string) => chalk.bold.yellow(str),
        styleUsage:                (str: string) => chalk.green(str),
        styleCommandText:          (str: string) => chalk.green(str),
        styleOptionTerm:           (str: string) => chalk.green(str),
        styleSubcommandTerm:       (str: string) => chalk.green(str),
        styleOptionDescription:    (str: string) => chalk.dim(str),
        styleSubcommandDescription:(str: string) => chalk.dim(str),
        styleCommandDescription:   (str: string) => chalk.dim(str),
    });

program
    .command("make:validator")
    .aliases(["generate", "mv"])
    .description("Interactively create a validation schema file for an existing feature")
    .action(async (): Promise<void> => {
        try {
            await makeValidatorCommand();
        } catch (e) {
            handleError(e);
        }
    });

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
}

program.parse(process.argv);
