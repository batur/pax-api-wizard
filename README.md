# pax-api-wizard

An interactive CLI tool to set up front-end API tooling for REST, GraphQL, and gRPC (coming soon).

## Installation

```bash
npm install -g pax-api-wizard
# or
npx pax-api-wizard
```

## Features

- 🚀 Interactive CLI interface
- 🔄 REST API client generation from OpenAPI specs
- ⚡ GraphQL client generation with type support
- 🔜 gRPC support (coming soon)
- 🔍 Automatic package manager detection (npm, yarn, pnpm)
- 📦 Handles dependency installation automatically

## Usage

Simply run the CLI and follow the prompts:

```bash
npx pax-api-wizard
```

- REST API Client
  For REST APIs:

1. Select REST API type
2. Enter your OpenAPI specification URL or file path
3. Specify output directory (defaults to "api")
4. The tool will:

- Generate a TypeScript Axios client
- Install axios dependency
- Place generated code in your specified directory

* GraphQL Client
  For GraphQL APIs:

1. Select GraphQL API type
2. Enter your GraphQL schema URL or file path
3. Specify output directory (defaults to "api")
4. The tool will:

- Create a GraphQL client with TypeScript types
- Set up codegen configuration
- Install necessary GraphQL dependencies
- Generate the client code

## Requirements

- Node.js (>= 14.x recommended)
- Internet connection for dependency installation

## Dependencies

The tool installs the following dependencies as needed:

- REST clients: axios
- GraphQL clients: graphql, @graphql-codegen/cli and related packages

## License

MIT

## Author

Batur Akkurt
