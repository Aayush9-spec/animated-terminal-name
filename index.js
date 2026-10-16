
const figlet = require("figlet");
const gradientModule = require("gradient-string");
const chalkModule = require("chalk");

const gradient =
  typeof gradientModule === "function"
    ? gradientModule
    : gradientModule.default;

const chalk =
  typeof chalkModule === "function"
    ? chalkModule
    : chalkModule.default;

if (typeof gradient !== "function") {
  throw new Error(
    "Could not load gradient-string. Check its installed version."
  );
}

const name = "AAYUSH";

const colors = [
  gradient(["#00F5FF", "#8A2BE2", "#FF00FF"]),
  gradient(["#00FF87", "#60EFFF", "#0061FF"]),
  gradient(["#FF512F", "#DD2476", "#7F00FF"]),
];

let frame = 0;

function animate() {
  console.clear();

  const title = figlet.textSync(name, {
    font: "ANSI Shadow",
    horizontalLayout: "default",
  });

  console.log("\n\n");
  console.log(colors[frame % colors.length](title));
  console.log(
    chalk.gray("\n       ✦ DEVELOPER • CREATOR • BUILDER ✦")
  );
  console.log(chalk.cyan("\n            Press Ctrl + C to exit"));

  frame++;
}

animate();
setInterval(animate, 500);


