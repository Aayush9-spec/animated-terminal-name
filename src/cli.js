import * as p from "@clack/prompts";
import { THEMES } from "./themes.js";

export function parseArgs(argv) {
  const result = {
    name: "AAYUSH",
    theme: "neon",
    dashboard: false,
    once: false,
    interactive: false,
    help: false,
    version: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--name" || arg === "-n") {
      result.name = argv[++i];
      if (!result.name) throw new Error(`${arg} requires a name.`);
    } else if (arg === "--theme" || arg === "-t") {
      result.theme = argv[++i];
      if (!result.theme) throw new Error(`${arg} requires a theme.`);
    } else if (arg === "--dashboard" || arg === "-d") {
      result.dashboard = true;
    } else if (arg === "--once") {
      result.once = true;
    } else if (arg === "--interactive" || arg === "-i") {
      result.interactive = true;
    } else if (arg === "--help" || arg === "-h") {
      result.help = true;
    } else if (arg === "--version" || arg === "-v") {
      result.version = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  return result;
}

export function printHelp() {
  console.log(`
Animated Terminal Name — a neon terminal animation and system dashboard

Usage:
  animated-name [options]
  npm start -- [options]

Options:
  -n, --name <name>       Name to display (default: AAYUSH)
  -t, --theme <theme>     Theme: ${Object.keys(THEMES).join(", ")}
  -d, --dashboard         Show system dashboard
      --once              Print the name once and exit
  -i, --interactive       Open the interactive setup menu
  -h, --help              Show this help
  -v, --version           Show version

Keyboard controls while animating:
  T next theme   F next font   D toggle dashboard
  Space pause    R restart    Q quit

Examples:
  animated-name
  animated-name --name "AAYUSH SINGH" --theme ocean
  animated-name --dashboard
  animated-name --once --theme matrix
`);
}

export async function interactiveSetup(defaults) {
  p.intro("Animated Terminal Name");

  const name = await p.text({
    message: "What name should be displayed?",
    initialValue: defaults.name || "AAYUSH",
    defaultValue: "AAYUSH",
    placeholder: "AAYUSH"
  });
  if (p.isCancel(name)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const theme = await p.select({
    message: "Choose a theme",
    initialValue: defaults.theme || "neon",
    options: Object.entries(THEMES).map(([value, item]) => ({
      value,
      label: item.label
    }))
  });
  if (p.isCancel(theme)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  const dashboard = await p.confirm({
    message: "Show the system dashboard?",
    initialValue: Boolean(defaults.dashboard)
  });
  if (p.isCancel(dashboard)) {
    p.cancel("Setup cancelled.");
    return null;
  }

  p.outro("Launching animation...");
  return { ...defaults, name: String(name).trim() || "AAYUSH", theme, dashboard };
}
