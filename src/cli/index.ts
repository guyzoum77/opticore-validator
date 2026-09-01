#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import cfonts from "cfonts";

import { attachMakeValidatorCommand, forceOpticoreColors, helpConfig, VALIDATOR_VERSION } from "./registerValidatorCommand";

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
