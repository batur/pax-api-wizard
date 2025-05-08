#!/usr/bin/env node
import boxen from "boxen";
import figlet from "figlet";
import chalk from "chalk";
import prompts from "prompts";

import { execa } from "execa";

function renderHeader() {
  return console.log(
    boxen(figlet.textSync("API Wizard"), {
      padding: 1,
      borderStyle: "round",
      borderColor: "cyan",
      dimBorder: true,
    })
  );
}

function renderDescription() {
  return console.log(
    chalk.cyan(
      "A CLI tool to generate API endpoints and documentation with ease."
    )
  );
}

async function generateOpenAPIDocs(endpoint) {
  console.log(chalk.cyan("Generating OpenAPI documentation..."));
  await execa(
    "openapi-generator-cli",
    ["generate", "-i", endpoint, "-g", "typescript-axios", "-o", "./api-docs"],
    { stdio: "inherit" }
  );

  return console.log("✅ TypeScript Axios generated! Happy coding!");
}

function RestAPIHandler() {
  return prompts({
    type: "text",
    name: "endpoint",
    message: "Enter the REST API endpoint URL or path:",
  }).then((response) => {
    if (response.endpoint) {
      console.log(
        chalk.green(`Generated REST API endpoint: ${response.endpoint}`)
      );
      generateOpenAPIDocs(response.endpoint);
    } else {
      console.log(chalk.red("No endpoint provided."));
    }
  });
}

function handleSelection(selection) {
  switch (selection) {
    case "rest":
      console.log(chalk.green("You selected REST API."));
      RestAPIHandler();
      break;
    case "graphql":
      console.log(chalk.green("You selected GraphQL API."));
      break;
    case "grpc":
      console.log(chalk.green("You selected gRPC API."));
      break;
    default:
      console.log(chalk.red("Invalid selection."));
  }
}

function renderPrompts() {
  return prompts({
    type: "select",
    name: "apiType",
    message: "Select the API type you want to generate:",
    choices: [
      { title: "REST", value: "rest" },
      { title: "GraphQL", value: "graphql" },
      { title: "gRPC", value: "grpc" },
    ],
    initial: 0,
  }).then((response) => {
    if (response.apiType) {
      handleSelection(response.apiType);
    } else {
      console.log(chalk.red("No selection made."));
    }
  });
}

function main() {
  renderHeader();
  renderDescription();
  renderPrompts();
}

main();
