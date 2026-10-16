import os from "node:os";
import process from "node:process";
import readline from "node:readline";
import { emitKeypressEvents } from "node:readline";
import figlet from "figlet";
import gradient from "gradient-string";
import chalk from "chalk";
import { THEMES, getTheme, nextThemeName } from "./themes.js";
import { renderDashboard } from "./dashboard.js";

const FONTS = ["ANSI Shadow", "Big", "Slant", "Standard", "Small"];

function supportsColor() {
  return Boolean(process.stdout.isTTY && !process.env.NO_COLOR);
}

function makeTitle(name, font) {
  try {
    return figlet.textSync(name, { font, horizontalLayout: "default" });
  } catch {
    return name.toUpperCase();
  }
}

function drawProgress(width = 24) {
  const n = Math.floor((Date.now() / 160) % (width + 1));
  return `${"━".repeat(n)}${chalk.gray("─".repeat(width - n))}`;
}

export function startAnimation(options = {}) {
  const state = {
    name: (options.name || "AAYUSH").trim().toUpperCase(),
    themeName: options.theme || "neon",
    fontIndex: 0,
    paused: false,
    showDashboard: Boolean(options.dashboard),
    frame: 0,
    interval: null,
    clock: new Date()
  };

  getTheme(state.themeName);
  const colorEnabled = supportsColor();
  const originalRawMode = Boolean(process.stdin.isTTY && process.stdin.isRaw);

  function render() {
    if (state.paused) return;
    state.frame++;
    state.clock = new Date();
    console.clear();

    if (state.showDashboard) {
      renderDashboard();
      console.log("");
    }

    const theme = getTheme(state.themeName);
    const art = makeTitle(state.name, FONTS[state.fontIndex]);
    const paint = colorEnabled ? gradient(theme.colors) : (text) => text;

    console.log("");
    console.log(paint(art));
    console.log(chalk.gray("       ✦ DEVELOPER • CREATOR • BUILDER ✦"));
    console.log("");
    console.log(chalk.cyan(`  THEME ${state.themeName.toUpperCase()}  ${drawProgress()}`));
    console.log(chalk.gray(`  ${state.clock.toLocaleTimeString()}  •  ${os.platform()} ${os.arch()}`));
    console.log("");
    console.log(chalk.white("  Keyboard controls"));
    console.log(`  ${chalk.cyan("T")} next theme   ${chalk.cyan("F")} next font   ${chalk.cyan("D")} dashboard`);
    console.log(`  ${chalk.cyan("Space")} pause/resume   ${chalk.cyan("R")} restart   ${chalk.cyan("Q")} quit`);
    console.log("");
    console.log(chalk.gray("  Tip: run `animated-name --help` to see CLI options."));
  }

  function cleanup() {
    if (state.interval) clearInterval(state.interval);
    state.interval = null;
    if (process.stdin.isTTY) {
      process.stdin.removeAllListeners("keypress");
      if (!originalRawMode) process.stdin.setRawMode(false);
      process.stdin.pause();
    }
    if (process.stdout.isTTY) console.clear();
  }

  function onKeypress(_str, key = {}) {
    if (key.ctrl && key.name === "c") {
      cleanup();
      process.exit(0);
    }

    const pressed = key.name;
    if (pressed === "q" || pressed === "escape") {
      cleanup();
      process.exit(0);
    } else if (pressed === "space") {
      state.paused = !state.paused;
      if (!state.paused) render();
      else console.log(chalk.yellow("\n  Paused — press Space to resume."));
    } else if (pressed === "t") {
      state.themeName = nextThemeName(state.themeName);
      render();
    } else if (pressed === "f") {
      state.fontIndex = (state.fontIndex + 1) % FONTS.length;
      render();
    } else if (pressed === "d") {
      state.showDashboard = !state.showDashboard;
      render();
    } else if (pressed === "r") {
      state.frame = 0;
      state.paused = false;
      render();
    }
  }

  if (process.stdin.isTTY && typeof process.stdin.setRawMode === "function") {
    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("keypress", onKeypress);
  } else {
    console.log("Interactive keyboard controls require a TTY. Press Ctrl+C to stop.");
  }

  render();
  state.interval = setInterval(render, 180);

  return cleanup;
}
