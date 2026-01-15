import { Command } from "../common.js";

export const helpCommand: Command = {
  name: "help",
  description: "Show help for specific command.",
  usage: 'ippo-cli help [command]',
  argsConfig: {},
  async run(args: string[]): Promise<number> {
    return 10;
  },
};
