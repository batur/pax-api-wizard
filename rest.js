import chalk from "chalk";
import prompts from "prompts";
import { execa } from "execa";
import path from "node:path";

import { detectPackageManager } from "./utils.js";
import contents from "./contents.js";

async function generateRestClient(openapiUrl) {
  const { outDir } = await prompts({
    type: "text",
    name: "outDir",
    message: contents.outputDirQuestion,
    initial: "api",
    validate: (v) => (v.trim() ? true : contents.outputDirValidation),
  });

  if (!outDir) throw new Error(contents.noOutputDirProvided);
  const outDirPath = path.resolve(process.cwd(), outDir);

  console.log(chalk.cyan(contents.generatingClient));
  await execa(
    "openapi-generator-cli",
    [
      "generate",
      "-i",
      openapiUrl,
      "-g",
      "typescript-axios",
      "-o",
      outDir,
      "--skip-validate-spec", // handy for public specs
    ],
    { stdio: "inherit" }
  );

  // install axios into the caller’s project
  const pm = detectPackageManager();
  const installCmd =
    pm === "yarn"
      ? ["add", "axios"]
      : ["add", "axios", pm === "npm" ? "--save" : ""];

  console.log(chalk.cyan(contents.installRuntimeDependency + `${pm} …`));
  await execa(pm, installCmd.filter(Boolean), { stdio: "inherit" });

  console.log(
    chalk.green(
      contents.clientGenerated + `${path.relative(process.cwd(), outDir)}`
    )
  );
}

async function askRestEndpoint() {
  const { endpoint } = await prompts({
    type: "text",
    name: "endpoint",
    message: contents.askRestEndpointQuestion,
    validate: (v) => (v.trim() ? true : contents.restEndpointValidation),
  });
  if (!endpoint) throw new Error(contents.noEndpointProvided);
  return endpoint.trim();
}

export { generateRestClient, askRestEndpoint };
