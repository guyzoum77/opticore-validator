#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import cfonts from "cfonts";

import { attachMakeValidatorCommand, forceOpticoreColors, helpConfig, VALIDATOR_VERSION } from "./registerValidatorCommand";

function printBanner(): void {
    cfonts.say("OpticoreJs", {
        font: "block",
        align: "left",
        colors: ["#D4E4FF", "#427ff5"],
        background: "transparent",
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: "0",
    });

    const name   = chalk.bold.hex("#5384d7");
    const dim    = chalk.bold.hex("#D4E4FF");

    console.log(` ${name("OPTICOREJS  V A L I D A T O R")}`);
    console.log(` ${dim("Schema validation & Express middleware for Opticore projects")}\n`);
    console.log(` ${chalk.bold.dim("Documentation")}  ${chalk.underline.cyan("https://github.com/guyzoum77/opticore-validator")}\n`);
}

forceOpticoreColors();
printBanner();

const program = new Command();
program
    .name("opticore-validator")
    .description(chalk.dim("Generate validation schemas and wire the validate middleware"))
    .version(
        VALIDATOR_VERSION,
        "-v, --version",
        "Output the current version"
    )
    .configureHelp(helpConfig);

attachMakeValidatorCommand(program);

if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
}

program.parse(process.argv);
