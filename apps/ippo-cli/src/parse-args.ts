import { parseArgs, ParseArgsConfig } from "node:util";

// NOTE: It's simple implementation and allow to put options before command, but for now I don't care (or maybe it's feature not a bug)
export type ParsedArgs = {
  commands: string[],
  options: object,
}

const parseConfig: ParseArgsConfig = {
  allowPositionals: true,
  strict: false,
  tokens: false,
};

// TODO: Add way to use options with space between option and value
export function parseCliArgs(args?: string[]): ParsedArgs {
  if (args !== undefined) {
    parseConfig.args = args;
  }

  const result = parseArgs(parseConfig);
  // console.log(result);

  return {
    commands: result.positionals,
    options: result.values
  };
}
