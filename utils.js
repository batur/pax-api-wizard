import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";
import fs from "node:fs";
import path from "node:path";

function detectPackageManager() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function header() {
  console.log(
    boxen(figlet.textSync("API Wizard"), {
      padding: 1,
      borderStyle: "round",
      borderColor: "cyan",
      dimBorder: true,
    })
  );
  console.log(
    chalk.cyan("A CLI tool to generate API clients & docs with ease.\n")
  );
}

export { detectPackageManager, header };
