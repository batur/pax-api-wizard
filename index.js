#!/usr/bin/env node
// ESM imports
import chalk from "chalk";
import prompts from "prompts";

import { generateRestClient, askRestEndpoint } from "./rest.js";
import { header } from "./utils.js";
import contents from "./contents.js";

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

(async () => {
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
})();
