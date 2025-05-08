import prompts from "prompts";
import path from "node:path";
import { execa } from "execa";
import chalk from "chalk";
import fs from "node:fs";

import contents from "./contents.js";
import {
  configTemplate,
  generatesInnerConfigTemplate,
  generatesTypesConfigTemplate,
} from "./codegentemplate.js";

async function handleCodegenTemplatete(outDirPath, graphqlUrl) {
  const template = configTemplate;

  const normalizedOutDir = outDirPath.endsWith("/")
    ? outDirPath
    : `${outDirPath}/`;

  template.schema = graphqlUrl;
  template.documents = [`${normalizedOutDir}**/*.tsx`];
  template.generates[normalizedOutDir] = {
    ...generatesInnerConfigTemplate,
  };
  template.generates[`${outDirPath}/types.ts`] = {
    ...generatesTypesConfigTemplate,
  };

  const codegenContent = `
  const config = ${JSON.stringify(template, null, 2)};

  export default config;
  `;

  await fs.promises.writeFile("codegen.js", codegenContent);
}

async function generateGraphQLClient(graphqlUrl) {
  const { outDir } = await prompts({
    type: "text",
    name: "outDir",
    message: contents.outputDirQuestion,
    initial: contents.outputDirDefault,
    validate: (v) => (v.trim() ? true : contents.outputDirValidation),
  });
  if (!outDir) throw new Error(contents.noOutputDirProvided);

  await handleCodegenTemplatete(outDir, graphqlUrl);

  await execa("graphql-codegen", ["generate", "--config", "codegen.js"], {
    stdio: "inherit",
  });

  console.log(
    chalk.green(
      contents.clientGenerated + `${path.relative(process.cwd(), outDir)}`
    )
  );
}

async function askGraphQLSchemaEndpoint() {
  const { endpoint } = await prompts({
    type: "text",
    name: "endpoint",
    message: contents.askGraphQLEndpointQuestion,
    validate: (v) => (v.trim() ? true : contents.noGraphQLSchemaProvided),
  });

  if (endpoint === undefined) throw new Error(contents.noSelectionMade);
  return endpoint.trim();
}

export { askGraphQLSchemaEndpoint, generateGraphQLClient };
