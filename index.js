#!/usr/bin/env node
// ESM imports
import boxen from "boxen";
import chalk from "chalk";
import figlet from "figlet";
import prompts from "prompts";
import { execa } from "execa";
import fs from "node:fs";
import path from "node:path";

/* ═════════ UI helpers ═════════ */

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

/* ═════════ package-manager detection ═════════ */

function detectPackageManager() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

/* ═════════ REST handler ═════════ */

async function generateRestClient(openapiUrl) {
  const { outDir } = await prompts({
    type: "text",
    name: "outDir",
    message: "Enter the output directory for the generated client",
    initial: "api",
    validate: (v) => (v.trim() ? true : "Value required"),
  });

  if (!outDir) throw new Error("No output directory provided");
  const outDirPath = path.resolve(process.cwd(), outDir);

  console.log(chalk.cyan("\nGenerating TypeScript Axios client …"));
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

  console.log(
    chalk.cyan(`\nInstalling runtime dependency (axios) via ${pm} …`)
  );
  await execa(pm, installCmd.filter(Boolean), { stdio: "inherit" });

  console.log(
    chalk.green(
      `\n✅ Client generated in ${path.relative(process.cwd(), outDir)}`
    )
  );
}

/* ═════════ prompt flow ═════════ */

async function askApiType() {
  const { apiType } = await prompts({
    type: "select",
    name: "apiType",
    message: "Select the API type you want to generate:",
    choices: [
      { title: "REST", value: "rest" },
      { title: "GraphQL", value: "graphql" },
      { title: "gRPC", value: "grpc" },
    ],
    initial: 0,
  });

  if (!apiType) throw new Error("No selection made");
  return apiType;
}

async function askRestEndpoint() {
  const { endpoint } = await prompts({
    type: "text",
    name: "endpoint",
    message: "Enter the REST API spec URL or file path:",
    validate: (v) => (v.trim() ? true : "Value required"),
  });
  if (!endpoint) throw new Error("No endpoint provided");
  return endpoint.trim();
}

/* ═════════ main ═════════ */

(async () => {
  try {
    header();
    const type = await askApiType();

    switch (type) {
      case "rest":
        const spec = await askRestEndpoint();
        await generateRestClient(spec);
        break;

      case "graphql":
        console.log(chalk.yellow("GraphQL generator coming soon!"));
        break;

      case "grpc":
        console.log(chalk.yellow("gRPC generator coming soon!"));
        break;
    }
  } catch (err) {
    console.error(chalk.red(`\n✖ ${err.message}`));
    process.exit(1);
  }
})();
