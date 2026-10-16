export const THEMES = {
  neon: {
    label: "Neon cyan / purple",
    colors: ["#00F5FF", "#8A2BE2", "#FF00FF"],
    accent: "#00F5FF"
  },
  matrix: {
    label: "Matrix green",
    colors: ["#00FF41", "#008F11", "#CCFFCC"],
    accent: "#00FF41"
  },
  ocean: {
    label: "Deep ocean",
    colors: ["#00C6FF", "#0072FF", "#7AFcff"],
    accent: "#00C6FF"
  },
  sunset: {
    label: "Sunset",
    colors: ["#FF512F", "#DD2476", "#FFB75E"],
    accent: "#FF8A5B"
  },
  rainbow: {
    label: "Rainbow",
    colors: ["#FF0080", "#7928CA", "#0070F3", "#00DFD8"],
    accent: "#FF0080"
  }
};

export function getTheme(name = "neon") {
  const theme = THEMES[name.toLowerCase()];
  if (!theme) {
    const available = Object.keys(THEMES).join(", ");
    throw new Error(`Unknown theme "${name}". Available themes: ${available}`);
  }
  return theme;
}

export function nextThemeName(currentName) {
  const names = Object.keys(THEMES);
  const index = names.indexOf(currentName);
  return names[(index + 1 + names.length) % names.length];
}
