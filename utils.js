import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";
import fs from "node:fs";
import path from "node:path";
import prompts from "prompts";

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

async function askApiType() {
  const { apiType } = await prompts({
    type: "select",
    name: "apiType",
    message: contents.askAPITypeQuestion,
    choices: [
      {
        title: contents.APITypes.rest,
        value: contents.APITypes.rest.toLowerCase(),
      },
      {
        title: contents.APITypes.graphql,
        value: contents.APITypes.graphql.toLowerCase(),
      },
      {
        title: contents.APITypes.grpc,
        value: contents.APITypes.grpc.toLowerCase(),
      },
    ],
    initial: 0,
  });

  if (!apiType) throw new Error(contents.noSelectionMade);
  return apiType;
}

export { detectPackageManager, header, askApiType };
