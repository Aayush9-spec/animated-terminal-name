import test from "node:test";
import assert from "node:assert/strict";
import { THEMES, getTheme, nextThemeName } from "../src/themes.js";
import { parseArgs } from "../src/cli.js";

test("all themes have a label and colors", () => {
  for (const theme of Object.values(THEMES)) {
    assert.ok(theme.label);
    assert.ok(Array.isArray(theme.colors));
    assert.ok(theme.colors.length >= 2);
  }
});

test("getTheme returns a known theme", () => {
  assert.equal(getTheme("neon"), THEMES.neon);
});

test("getTheme rejects unknown themes", () => {
  assert.throws(() => getTheme("not-a-theme"), /Unknown theme/);
});

test("nextThemeName cycles through themes", () => {
  const names = Object.keys(THEMES);
  assert.equal(nextThemeName(names.at(-1)), names[0]);
});

test("parseArgs reads name, theme, and dashboard", () => {
  assert.deepEqual(
    parseArgs(["--name", "AAYUSH SINGH", "--theme", "ocean", "--dashboard"]),
    {
      name: "AAYUSH SINGH",
      theme: "ocean",
      dashboard: true,
      once: false,
      interactive: false,
      help: false,
      version: false
    }
  );
});

test("parseArgs rejects unknown flags", () => {
  assert.throws(() => parseArgs(["--unknown"]), /Unknown option/);
});
