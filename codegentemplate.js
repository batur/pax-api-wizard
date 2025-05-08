const configTemplate = {
  schema: "",
  documents: [],
  generates: {},
  ignoreNoDocuments: true,
};

const generatesInnerConfigTemplate = {
  preset: "client",
  presetConfig: {
    gqlTagName: "gql",
  },
};

const generatesTypesConfigTemplate = {
  plugins: ["typescript", "typescript-operations"],
};

export {
  configTemplate,
  generatesInnerConfigTemplate,
  generatesTypesConfigTemplate,
};
