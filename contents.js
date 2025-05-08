const contents = Object.freeze({
  askAPITypeQuestion: "Select the API type you want to generate:",
  APITypes: {
    rest: "REST",
    graphql: "GraphQL",
    grpc: "gRPC",
  },
  noSelectionMade: "No selection made",
  outputDirQuestion: "Enter the output directory for the generated client",
  outputDirDefault: "api",
  outputDirValidation: "Value required",
  noOutputDirProvided: "No output directory provided",
  generatingClient: "\nGenerating TypeScript Axios client …",
  generatingGraphQLClient: "\nGenerating TypeScript GraphQL client …",
  installRuntimeDependency: "\nInstalling runtime dependency (axios) via ",
  clientGenerated: "\n✅ Client generated in ",
  askRestEndpointQuestion: "Enter the REST API spec URL or file path:",
  restEndpointValidation: "Value required",
  noEndpointProvided: "No endpoint provided",
  askGraphQLEndpointQuestion: "Enter the GraphQL spec URL or file path:",
  noGraphQLSchemaProvided: "No GraphQL schema provided",
});

export default contents;
