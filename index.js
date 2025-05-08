#!/usr/bin/env node
// ESM imports
import chalk from "chalk";

import { generateRestClient, askRestEndpoint } from "./rest.js";
import { header } from "./utils.js";
import { askGraphQLSchemaEndpoint, generateGraphQLClient } from "./graphql.js";

(async () => {
  header();
  const type = await askApiType();

  switch (type) {
    case "rest":
      const restSpec = await askRestEndpoint();
      await generateRestClient(restSpec);
      break;

    case "graphql":
      const graphqlSpec = await askGraphQLSchemaEndpoint();
      await generateGraphQLClient(graphqlSpec);
      break;

    case "grpc":
      console.log(chalk.yellow("gRPC generator coming soon!"));
      break;
  }
})();
