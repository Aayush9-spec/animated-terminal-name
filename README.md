# Animated Terminal Name

A neon, interactive terminal name animation and system dashboard built with Node.js. The default display name is **AAYUSH**.

## Features

- Five color themes: neon, matrix, ocean, sunset, rainbow
- ASCII name art with several fonts
- Interactive setup menu
- Keyboard controls while the animation runs
- Live clock and system dashboard
- CLI flags for name, theme, dashboard, help, and version
- Tests using Node.js's built-in test runner
- ES modules throughout, compatible with modern Node.js

## Requirements

- Node.js 20 or newer
- npm

## Install

```bash
git clone https://github.com/YOUR_USERNAME/animated-terminal-name.git
cd animated-terminal-name
npm install
```

If you are working in your existing project folder instead, skip `git clone` and run `npm install` there.

## Run

Interactive setup (when launched in a terminal):

```bash
npm start
```

Run with a custom name and theme:

```bash
npm start -- --name "AAYUSH SINGH" --theme ocean
```

Show the dashboard:

```bash
npm start -- --dashboard
```

Print the name once and exit:

```bash
npm start -- --once --theme matrix
```

Show all CLI options:

```bash
npm start -- --help
```

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `T` | Switch to the next theme |
| `F` | Switch ASCII font |
| `D` | Toggle the system dashboard |
| `Space` | Pause or resume |
| `R` | Restart animation |
| `Q` or `Esc` | Quit |
| `Ctrl+C` | Exit |

Keyboard shortcuts require an interactive terminal (TTY).

## Run checks and tests

```bash
npm run check
npm test
```

## Project structure

```text
animated-terminal-name/
├── src/
│   ├── index.js
│   ├── cli.js
│   ├── animation.js
│   ├── dashboard.js
│   └── themes.js
├── tests/
│   └── themes.test.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Troubleshooting

### ESM or `require is not defined`

This project uses ES modules (`"type": "module"`). Use `import` statements in source files.

### `gradient is not a function`

Install the declared dependencies with `npm install` and use the ESM imports included in `src/animation.js` and `src/index.js`.

### Animation is not responding to keys

Run it directly in macOS Terminal or another interactive terminal. Some IDE output panels and non-interactive shells do not support raw keyboard input.

## License

MIT
