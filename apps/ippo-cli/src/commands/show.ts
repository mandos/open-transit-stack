import { Command, ParsedInputs, consoleOutput, ExitCode } from '../common.js';

export const showCommand: Command = {
  name: "show",
  description: "Show information about zip package",
  usage: "you can figure out",
  run: async (args: ParsedInputs) => {
    consoleOutput.out(args.command);
    return ExitCode.Success;
  }
};
