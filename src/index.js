#!/usr/bin/env node
import process from "node:process";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import { parseArgs, printHelp, interactiveSetup } from "./cli.js";
import { getTheme } from "./themes.js";
import { renderDashboard } from "./dashboard.js";
import { startAnimation } from "./animation.js";

const VERSION = "2.0.0";

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
    if (options.help) {
      printHelp();
      return;
    }
    if (options.version) {
      console.log(VERSION);
      return;
    }
    getTheme(options.theme);
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    console.error("Run `animated-name --help` for usage.");
    process.exitCode = 1;
    return;
  }

  if (options.interactive || process.argv.length <= 2) {
    if (process.stdin.isTTY && process.stdout.isTTY) {
      const configured = await interactiveSetup(options);
      if (!configured) return;
      options = configured;
    } else if (options.interactive) {
      console.error("Interactive setup needs a terminal. Try `npm start -- --help`.");
      process.exitCode = 1;
      return;
    }
  }

  if (options.once) {
    const theme = getTheme(options.theme);
    const art = figlet.textSync(options.name, { font: "ANSI Shadow" });
    console.log(gradient(theme.colors)(art));
    return;
  }

  if (options.dashboard && !process.stdin.isTTY) {
    renderDashboard();
    return;
  }

  startAnimation(options);
}

main().catch((error) => {
  console.error(chalk.red(error.stack || error.message));
  process.exitCode = 1;
});
